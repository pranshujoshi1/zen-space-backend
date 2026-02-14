from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Any, Dict, Literal, Optional

import jwt
from passlib.context import CryptContext

from ..config import get_settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


MAX_PASSWORD_BYTES = 72


def _truncate_password(password: str) -> str:
    """
    Bcrypt only considers the first 72 bytes of a password.
    Truncate to 72 characters to avoid ValueErrors when users submit longer strings.
    """

    if len(password.encode("utf-8")) <= MAX_PASSWORD_BYTES:
        return password
    # Truncate by bytes to avoid cutting multibyte characters mid-way
    return password.encode("utf-8")[:MAX_PASSWORD_BYTES].decode("utf-8", errors="ignore")


def hash_password(password: str) -> str:
    return pwd_context.hash(_truncate_password(password))


def verify_password(password: str, hashed: str) -> bool:
    return pwd_context.verify(_truncate_password(password), hashed)


def create_access_token(subject: str, additional_claims: Dict[str, Any] | None = None) -> str:
    settings = get_settings()
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.access_token_expire_minutes)
    payload = {"sub": subject, "exp": expire, "type": "access"}
    if additional_claims:
        payload.update(additional_claims)
    return jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)


def create_refresh_token(subject: str, session_id: str) -> str:
    settings = get_settings()
    expire = datetime.now(timezone.utc) + timedelta(days=settings.refresh_token_expire_days)
    payload = {"sub": subject, "exp": expire, "type": "refresh", "sid": session_id}
    return jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)


def decode_token(token: str, expected_type: Optional[Literal["access", "refresh"]] = None) -> Dict[str, Any]:
    settings = get_settings()
    payload = jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
    token_type = payload.get("type")
    if expected_type and token_type != expected_type:
        raise jwt.InvalidTokenError("Invalid token type")
    return payload

