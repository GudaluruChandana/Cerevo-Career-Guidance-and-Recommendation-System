from fastapi import APIRouter, Depends, Body
from sqlalchemy.orm import Session

from backend.db import get_db
from backend import models
from backend.dependencies import get_current_user

router = APIRouter(tags=["Profile"])


# ============================
# GET PROFILE
# ============================
@router.get("/me")
def get_my_profile(
    current_user: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user = db.query(models.User).filter(
        models.User.id == current_user
    ).first()

    profile = db.query(models.Profile).filter(
        models.Profile.user_id == current_user
    ).first()

    if not user:
        return {"error": "User not found"}

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,

        "phone": profile.phone if profile else "",
        "stage": profile.stage if profile else "",
        "stream": profile.stream if profile else "",
        "location": profile.location if profile else "",
        "college": profile.college if profile else "",
        "year": profile.passing_year if profile else ""
    }


# ============================
# SAVE / UPDATE PROFILE
# ============================
@router.post("/me")
def save_my_profile(
    data: dict = Body(...),
    current_user: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    profile = db.query(models.Profile).filter(
        models.Profile.user_id == current_user
    ).first()

    if not profile:
        profile = models.Profile(user_id=current_user)

    profile.phone = data.get("phone")
    profile.stage = data.get("stage")
    profile.stream = data.get("stream")
    profile.location = data.get("location")
    profile.college = data.get("college")
    profile.passing_year = data.get("year")

    db.add(profile)
    db.commit()

    return {"message": "Profile saved successfully"}
