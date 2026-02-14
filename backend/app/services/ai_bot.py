from __future__ import annotations

from typing import Any, Dict, Optional

import httpx

from app.config import get_settings


class AIBotError(RuntimeError):
    """Raised when the external AI bot fails to return a usable response."""


async def fetch_ai_reply(message: str, context: Optional[Dict[str, Any]] = None) -> str:
    """
    Call the external AI bot (Flask `app.py`) and return its reply string.

    Args:
        message: The user's message text.
        context: Optional metadata to forward (e.g., user info).

    Returns:
        The reply string produced by the AI bot.

    Raises:
        AIBotError: If the downstream service fails or returns invalid data.
    """

    settings = get_settings()
    payload: Dict[str, Any] = {"message": message}
    if context:
        payload["context"] = context

    try:
        async with httpx.AsyncClient(timeout=settings.ai_bot_timeout) as client:
            response = await client.post(settings.ai_bot_url, json=payload)
    except httpx.HTTPError as exc:
        raise AIBotError(f"Failed to reach AI service: {exc}") from exc

    try:
        data = response.json()
    except ValueError as exc:
        raise AIBotError("AI service returned invalid JSON.") from exc

    if not response.is_success:
        raise AIBotError(data.get("error") or f"AI service error {response.status_code}")

    reply = data.get("reply")
    if not reply or not isinstance(reply, str):
        raise AIBotError("AI service response missing 'reply' field.")

    return reply.strip()


