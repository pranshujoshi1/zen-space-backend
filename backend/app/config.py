from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    mongo_uri: str = Field(..., alias="MONGO_URI")
    mongo_db: str = Field("zenspace", alias="MONGO_DB")

    jwt_secret: str = Field(..., alias="JWT_SECRET")
    jwt_algorithm: str = Field("HS256", alias="JWT_ALGORITHM")
    access_token_expire_minutes: int = Field(15, alias="ACCESS_TOKEN_EXPIRE_MINUTES")
    refresh_token_expire_days: int = Field(7, alias="REFRESH_TOKEN_EXPIRE_DAYS")

    google_client_id: str = Field(..., alias="GOOGLE_CLIENT_ID")
    google_client_secret: str = Field(..., alias="GOOGLE_CLIENT_SECRET")
    google_redirect_uri: str = Field(..., alias="GOOGLE_REDIRECT_URI")

    frontend_origin: str = Field("http://localhost:5173", alias="FRONTEND_ORIGIN")
    ai_bot_url: str = Field("http://127.0.0.1:5000/api/chat", alias="AI_BOT_URL")
    ai_bot_timeout: float = Field(30.0, alias="AI_BOT_TIMEOUT")


@lru_cache()
def get_settings() -> Settings:
    return Settings()

