from datetime import datetime
from typing import Optional, List

from beanie import Document, PydanticObjectId
from pydantic import Field


class Chat(Document):
    user_id: Optional[PydanticObjectId] = Field(default=None, index=True)
    message: str
    reply: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    risk_score: float = 0.0
    risk_flags: List[str] = Field(default_factory=list)

    class Settings:
        name = "chats"

