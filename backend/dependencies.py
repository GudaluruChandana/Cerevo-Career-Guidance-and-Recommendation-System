from fastapi import Depends, HTTPException, Header
from jose import jwt, JWTError
from sqlalchemy.orm import Session

from backend.jwt_utils import SECRET_KEY, ALGORITHM
from backend.db import get_db
from backend import models


# ===============================
# Extract Token
# ===============================
async def get_token_header(authorization: str = Header(None)):

    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization header")

    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid token format")

    return authorization.replace("Bearer ", "")


# ===============================
# Get Current User ID (SAFE)
# ===============================
# async def get_current_user(
#     token: str = Depends(get_token_header),
#     db: Session = Depends(get_db)
# ):

#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

#         user_id = payload.get("sub")

#         if user_id is None:
#             raise HTTPException(status_code=401, detail="Invalid token")

#         # ✅ Verify user exists
#         user = db.query(models.User)\
#                  .filter(models.User.id == int(user_id))\
#                  .first()

#         if not user:
#             raise HTTPException(status_code=401, detail="User not found")

#         return user.id   # ✅ ALWAYS RETURN ID

#     except JWTError:
#         raise HTTPException(status_code=401, detail="Token expired or invalid")

async def get_current_user(
    token: str = Depends(get_token_header),
    db: Session = Depends(get_db)
):

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        print("JWT PAYLOAD:", payload)  # optional (remove later)

        # Try all possible keys
        user_id = (
            payload.get("sub")
            or payload.get("id")
            or payload.get("user_id")
        )

        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token payload")

        user = db.query(models.User)\
                 .filter(models.User.id == int(user_id))\
                 .first()

        if not user:
            raise HTTPException(status_code=401, detail="User not found")

        return user.id

    except JWTError:
        raise HTTPException(status_code=401, detail="Token expired or invalid")
