from pydantic import BaseModel
from typing import List, Optional

# ---------- AUTH ----------
class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str


# ---------- PROFILE ----------
class ProfileCreate(BaseModel):
    tenth_percentage: float
    inter_stream: str
    inter_percentage: float
    degree: str
    branch: str
    degree_percentage: float


# ---------- RECOMMENDATION ----------
class RecommendationInput(BaseModel):
    stage: str
    marks: int
    interests: List[str]
    location: str
