from sqlalchemy import Column, Integer, String, Float, DateTime
from backend.db import Base
from datetime import datetime


# =========================
# USER TABLE
# =========================
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)

    phone = Column(String, nullable=True)

    stage = Column(String, nullable=True)   # ✅ ADD THIS

    stream = Column(String, nullable=True)
    location = Column(String, nullable=True)
    college = Column(String, nullable=True)
    passing_year = Column(String, nullable=True)

    tenth_percentage = Column(Float, nullable=True)
    inter_stream = Column(String, nullable=True)
    inter_percentage = Column(Float, nullable=True)

    degree = Column(String, nullable=True)
    branch = Column(String, nullable=True)
    degree_percentage = Column(Float, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)


# =========================
# RECOMMENDATION HISTORY
# =========================
class RecommendationHistory(Base):
    __tablename__ = "recommendation_history"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, index=True)

    recommended_stream = Column(String)

    score = Column(String)

    timestamp = Column(DateTime, default=datetime.utcnow)
