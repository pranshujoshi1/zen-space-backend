from fastapi import APIRouter, Depends

from ..dependencies.auth import get_current_user
from ..models.analytics import Analytics
from ..models.user import User

router = APIRouter(prefix="/api/analytics", tags=["analytics"])


@router.get("/")
async def list_analytics(current_user: User = Depends(get_current_user)):
    docs = await Analytics.find(Analytics.user_id == current_user.id).sort("-date").limit(100).to_list()
    return [doc.model_dump(by_alias=True) for doc in docs]

