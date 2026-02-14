from __future__ import annotations

from datetime import datetime
from typing import Optional, Literal

from beanie import Document, Indexed
from pydantic import BaseModel, EmailStr, Field


class ParentInfo(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None


class User(Document):
    name: str
    email: Indexed(EmailStr, unique=True)
    passwordHash: Optional[str] = None
    parent: ParentInfo = Field(default_factory=ParentInfo)

    authProvider: Literal["manual", "google"] = "manual"
    googleSub: Optional[str] = None

    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "users"

    async def before_save(self):
        self.updatedAt = datetime.utcnow()

