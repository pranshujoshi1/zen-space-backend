from datetime import datetime
from typing import Optional

from beanie import Document, PydanticObjectId
from pydantic import Field


class Session(Document):
    user_id: PydanticObjectId = Field(index=True)
    refresh_token_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    expires_at: datetime
    user_agent: Optional[str] = None
    ip_address: Optional[str] = None

    class Settings:
        name = "sessions"
        indexes = ["+expires_at"]

