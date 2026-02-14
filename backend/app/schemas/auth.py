from datetime import datetime
from typing import Optional, Literal

from pydantic import BaseModel, EmailStr, Field


class ParentInput(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None


class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    college: Optional[str] = None
    year: Optional[str] = None
    language: Optional[str] = None
    parentName: Optional[str] = None
    parentEmail: Optional[EmailStr] = None
    parentPhone: Optional[str] = None


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class RefreshRequest(BaseModel):
    refresh_token: str = Field(..., min_length=10)


class TokenPair(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class UserOut(BaseModel):
    id: str = Field(alias="_id")
    name: str
    email: EmailStr
    firstName: Optional[str] = None
    authProvider: Literal["manual", "google"]
    parent: ParentInput
    createdAt: datetime
    updatedAt: datetime

    class Config:
        populate_by_name = True


class AuthResponse(BaseModel):
    user: UserOut
    tokens: TokenPair

