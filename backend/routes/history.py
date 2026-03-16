from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.db import get_db
from backend.dependencies import get_current_user
from backend.models import RecommendationHistory

router = APIRouter(tags=["History"])


# ===============================
# GET ALL HISTORY (EXISTING)
# ===============================
@router.get("/me")
def get_my_history(
    current_user: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    history = (
        db.query(RecommendationHistory)
        .filter(RecommendationHistory.user_id == current_user)
        .order_by(RecommendationHistory.timestamp.desc())
        .all()
    )

    return history


# ===============================
# DELETE ONE HISTORY
# ===============================
@router.delete("/{history_id}")
def delete_history(
    history_id: int,
    current_user: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    record = (
        db.query(RecommendationHistory)
        .filter(
            RecommendationHistory.id == history_id,
            RecommendationHistory.user_id == current_user
        )
        .first()
    )

    if not record:
        raise HTTPException(status_code=404, detail="History not found")

    db.delete(record)
    db.commit()

    return {"message": "Deleted successfully"}


# ===============================
# CLEAR ALL HISTORY
# ===============================
@router.delete("/clear/all")
def clear_all_history(
    current_user: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    db.query(RecommendationHistory)\
      .filter(RecommendationHistory.user_id == current_user)\
      .delete()

    db.commit()

    return {"message": "All history cleared"}
