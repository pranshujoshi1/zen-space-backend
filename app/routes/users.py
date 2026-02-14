from fastapi import APIRouter, Depends

from ..dependencies.auth import get_current_user
from ..models.user import ParentInfo, User
from ..schemas.auth import UserOut, ParentInput

router = APIRouter(prefix="/api/users", tags=["users"])


@router.get("/me", response_model=UserOut)
async def get_me(current_user: User = Depends(get_current_user)):
    data = current_user.model_dump(by_alias=True)
    data["_id"] = str(current_user.id)
    data["parent"] = ParentInput(**current_user.parent.model_dump())
    return UserOut(**data)


@router.put("/me/parent", response_model=UserOut)
async def update_parent(parent: ParentInput, current_user: User = Depends(get_current_user)):
    current_user.parent = ParentInfo(**parent.model_dump())
    await current_user.save()
    data = current_user.model_dump(by_alias=True)
    data["_id"] = str(current_user.id)
    data["parent"] = parent
    return UserOut(**data)

