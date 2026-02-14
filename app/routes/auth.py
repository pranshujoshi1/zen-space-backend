from datetime import datetime, timedelta
from typing import Optional
import base64
import json

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.responses import RedirectResponse

from ..auth.google_oauth import oauth
from ..auth.jwt import (
    create_access_token,
    create_refresh_token,
    decode_token,
    hash_password,
    verify_password,
)
from ..config import get_settings
from ..models.session import Session
from ..models.user import ParentInfo, User
from ..schemas.auth import (
    AuthResponse,
    LoginRequest,
    ParentInput,
    RefreshRequest,
    SignupRequest,
    TokenPair,
    UserOut,
)

router = APIRouter(prefix="/api/auth", tags=["auth"])
settings = get_settings()


def user_to_out(user: User) -> UserOut:
    data = user.model_dump(by_alias=True)
    data["_id"] = str(user.id)
    data["parent"] = ParentInput(**user.parent.model_dump())
    data["firstName"] = user.name.split(" ")[0] if user.name else user.name
    return UserOut(**data)


async def _issue_tokens_for_user(user: User, user_agent: Optional[str], ip: Optional[str]) -> TokenPair:
    session_id = ObjectId()
    refresh = create_refresh_token(str(user.id), session_id=str(session_id))
    expires_at = datetime.utcnow() + timedelta(days=settings.refresh_token_expire_days)
    session = Session(
        id=session_id,
        user_id=user.id,
        refresh_token_hash=hash_password(refresh),
        expires_at=expires_at,
        user_agent=user_agent,
        ip_address=ip,
    )
    await session.insert()
    access = create_access_token(str(user.id))
    return TokenPair(access_token=access, refresh_token=refresh)


@router.post("/signup", response_model=AuthResponse)
async def signup(request: Request, payload: SignupRequest):
    email_lower = payload.email.lower()
    existing = await User.find_one(User.email == email_lower)

    parent = ParentInfo(
        name=payload.parentName,
        email=payload.parentEmail,
        phone=payload.parentPhone,
    )

    if existing:
        if existing.authProvider == "google" and not existing.passwordHash:
            existing.passwordHash = hash_password(payload.password)
            existing.parent = parent
            existing.authProvider = "manual"
            await existing.save()
            user = existing
        else:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")
    else:
        user = User(
            name=payload.name,
            email=email_lower,
            passwordHash=hash_password(payload.password),
            parent=parent,
            authProvider="manual",
            createdAt=datetime.utcnow(),
            updatedAt=datetime.utcnow(),
        )
        await user.insert()

    ua = request.headers.get("user-agent")
    ip = request.client.host if request.client else None
    tokens = await _issue_tokens_for_user(user, ua, ip)
    return AuthResponse(user=user_to_out(user), tokens=tokens)


@router.post("/login", response_model=AuthResponse)
async def login(request: Request, payload: LoginRequest):
    email_lower = payload.email.lower()
    user = await User.find_one(User.email == email_lower)

    if not user or not user.passwordHash or not verify_password(payload.password, user.passwordHash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    ua = request.headers.get("user-agent")
    ip = request.client.host if request.client else None
    tokens = await _issue_tokens_for_user(user, ua, ip)
    return AuthResponse(user=user_to_out(user), tokens=tokens)


@router.get("/google/start")
async def google_start(request: Request):
    redirect_uri = settings.google_redirect_uri
    return await oauth.google.authorize_redirect(request, redirect_uri)


@router.get("/google/callback")
async def google_callback(request: Request):
    token = await oauth.google.authorize_access_token(request)
    userinfo = await oauth.google.parse_id_token(request, token)

    email = userinfo.get("email")
    sub = userinfo.get("sub")
    name = userinfo.get("name") or email

    if not email or not sub:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid Google response")

    user = await User.find_one(User.email == email.lower())
    if user:
        user.googleSub = sub
        user.authProvider = "google"
        await user.save()
    else:
        user = User(
            name=name,
            email=email.lower(),
            passwordHash=None,
            parent=ParentInfo(),
            authProvider="google",
            googleSub=sub,
        )
        await user.insert()

    ua = request.headers.get("user-agent")
    ip = request.client.host if request.client else None
    tokens = await _issue_tokens_for_user(user, ua, ip)

    payload = {
        "user": user_to_out(user).model_dump(by_alias=True),
        "tokens": tokens.model_dump(),
    }
    encoded = base64.urlsafe_b64encode(json.dumps(payload, default=str).encode()).decode()
    redirect_url = f"{settings.frontend_origin}/?auth={encoded}"
    return RedirectResponse(url=redirect_url)


@router.post("/refresh", response_model=TokenPair)
async def refresh_tokens(request: Request, payload: RefreshRequest):
    try:
        claims = decode_token(payload.refresh_token, expected_type="refresh")
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")

    user_id = claims.get("sub")
    session_id = claims.get("sid")

    if not user_id or not session_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")

    try:
        user_object_id = ObjectId(user_id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")

    try:
        session_obj = await Session.get(ObjectId(session_id))
    except Exception:
        session_obj = None

    if not session_obj or session_obj.user_id != user_object_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Session not found")

    if session_obj.expires_at < datetime.utcnow():
        await session_obj.delete()
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Session expired")

    if not verify_password(payload.refresh_token, session_obj.refresh_token_hash):
        await session_obj.delete()
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")

    user = await User.get(user_object_id)
    if not user:
        await session_obj.delete()
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")

    await session_obj.delete()

    ua = request.headers.get("user-agent")
    ip = request.client.host if request.client else None
    return await _issue_tokens_for_user(user, ua, ip)

