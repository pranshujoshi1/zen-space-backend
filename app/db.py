from __future__ import annotations

from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from app.config import get_settings
from app.models.analytics import Analytics
from app.models.chat import Chat
from app.models.session import Session
from app.models.user import User

_client: AsyncIOMotorClient | None = None


async def init_db() -> None:
    """
    Initialize the MongoDB client and configure Beanie with all document models.

    This function should be invoked once on application startup (e.g., in FastAPI's
    lifespan handler or startup event) to ensure that database connections and
    ODM models are ready for use.
    """

    global _client
    if _client is not None:
        return

    settings = get_settings()

    _client = AsyncIOMotorClient(settings.mongo_uri)
    database = _client[settings.mongo_db or "zenspace"]

    await init_beanie(
        database=database,
        document_models=[User, Session, Chat, Analytics],
    )


def get_db_client() -> AsyncIOMotorClient:
    """
    Retrieve the initialized MongoDB client instance.

    Raises:
        RuntimeError: If `init_db` has not been called yet.
    """

    if _client is None:
        raise RuntimeError("Database not initialized. Call init_db() first.")
    return _client

