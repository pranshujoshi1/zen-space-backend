from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel

from ..dependencies.auth import get_current_user
from ..models.analytics import Analytics
from ..models.chat import Chat
from ..models.user import User
from ..services.ai_bot import AIBotError, fetch_ai_reply

router = APIRouter(prefix="/api/chat", tags=["chat"])


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    reply: str


class ChatHistoryOut(BaseModel):
    id: str
    message: str
    reply: str


RISK_KEYWORDS = ["suicide", "kill myself", "harm", "hopeless", "end it"]


@router.post("/send", response_model=ChatResponse)
async def send_chat(payload: ChatRequest, current_user: Optional[User] = Depends(get_current_user)):
    user_id = current_user.id if current_user else None
    user_text = payload.message

    flags = [kw for kw in RISK_KEYWORDS if kw.lower() in user_text.lower()]

    try:
        reply_text = await fetch_ai_reply(
            user_text,
            context={
                "user_id": str(user_id) if user_id else None,
                "risk_flags": flags,
            },
        )
    except AIBotError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"AI service unavailable: {exc}",
        ) from exc

    risk_score = 0.7 if flags else 0.1

    chat_doc = await Chat(
        user_id=user_id,
        message=user_text,
        reply=reply_text,
        risk_score=risk_score,
        risk_flags=flags,
    ).insert()

    await Analytics(
        user_id=user_id,
        risk_score=risk_score,
        flags={"keywords": flags},
    ).insert()

    return ChatResponse(reply=reply_text)


@router.get("/history", response_model=List[ChatHistoryOut])
async def get_history(current_user: User = Depends(get_current_user)):
    chats = await Chat.find(Chat.user_id == current_user.id).sort("-created_at").limit(50).to_list()
    return [
        ChatHistoryOut(
            id=str(chat.id),
            message=chat.message,
            reply=chat.reply,
        )
        for chat in reversed(chats)
    ]

