from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from backend.db import get_db
from backend import models, schemas
from backend.security import hash_password, verify_password
from backend.jwt_utils import create_access_token
from backend.schemas import UserCreate, UserLogin

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

# -----------------------------
# 🔐 REGISTER (JSON based)
# -----------------------------
@router.post("/register", status_code=201)
def register(
    user: schemas.UserCreate,
    db: Session = Depends(get_db)
):
    existing_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    new_user = models.User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully"
    }


# -----------------------------
# 🔐 LOGIN (OAuth2 + JWT)
# -----------------------------
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": str(db_user.id)})

    return {
        "message": "Login successful",
        "access_token": token,
        "token_type": "bearer",
        "user_id": db_user.id
    }

@router.post("/recommend/recommend")
def recommend_api(payload: dict, db: Session = Depends(get_db)):
    return recommend(payload, db=db)