from datetime import datetime
from typing import Optional, Dict, Any

from beanie import Document, PydanticObjectId
from pydantic import Field


class Analytics(Document):
    user_id: Optional[PydanticObjectId] = Field(default=None, index=True)
    date: datetime = Field(default_factory=datetime.utcnow)
    risk_score: float = 0.0
    flags: Dict[str, Any] = Field(default_factory=dict)
    metadata: Dict[str, Any] = Field(default_factory=dict)

    class Settings:
        name = "analytics"

