# # from fastapi import APIRouter, Depends
# # from sqlalchemy.orm import Session
# # from datetime import datetime

# # from backend.db import get_db
# # from backend import models
# # from backend.dependencies import get_current_user
# # from backend.recommender import recommend
# # from backend.models import RecommendationHistory


# # @router.post("/recommend")
# # def get_recommendation(
# #     payload: dict,
# #     db: Session = Depends(get_db),
# #     current_user: int = Depends(get_current_user) 
# # ):
# #     # current_user = 1   # TEMP FIX


# #     # ================= GET PROFILE =================

# #     user_profile = (
# #         db.query(models.Profile)
# #         .filter(models.Profile.user_id == current_user)
# #         .first()
# #     )


# #     # ================= BUILD PROFILE DATA =================

# #     profile_dict = None

# #     if user_profile:
# #         profile_dict = {
# #             "tenth_percentage": user_profile.tenth_percentage,
# #             "inter_stream": user_profile.inter_stream,
# #             "location": user_profile.location
# #         }


# #     # Track user
# #     payload["user_id"] = current_user


# #     # ================= RUN AI =================

# #     recommendations = recommend(payload, profile_dict, db)

# #     print("RECOMMEND RESULT:", recommendations)


# #     # ================= EXTRACT TOP RESULT =================

# #     career = None
# #     score = None


# #     # If recommender returns { count, results: [] }
# #     if isinstance(recommendations, dict) and "results" in recommendations:

# #         results = recommendations.get("results", [])

# #         if len(results) > 0:
# #             career = results[0].get("career_path")
# #             score = results[0].get("recommendation_score")


# #     # If recommender returns LIST
# #     elif isinstance(recommendations, list) and len(recommendations) > 0:

# #         career = recommendations[0].get("career_path")
# #         score = recommendations[0].get("recommendation_score")


# #     print("CAREER:", career)
# #     print("SCORE:", score)

# #     # ================= SAVE HISTORY =================

# # # If results exist, save ALL
# #     if isinstance(recommendations, dict) and "results" in recommendations:

# #         results = recommendations.get("results", [])

# #         for item in results:

# #             career = item.get("career_path")
# #             score = item.get("recommendation_score")

# #             if career and score:

# #                 history = RecommendationHistory(
# #                     user_id=current_user,
# #                     recommended_stream=career,
# #                     score=str(score),
# #                     timestamp=datetime.utcnow()
# #                 )

# #                 db.add(history)

# #             db.commit()

# #     else:
# #         print("❌ History NOT Saved (career/score missing)")


# #     return recommendations

# # # ======================================
# # # GET HISTORY (OPTIONAL HERE)
# # # ======================================
# # @router.get("/history")
# # def get_history(
# #     db: Session = Depends(get_db),
# #     current_user: int = Depends(get_current_user)
# # ):

# #     history = (
# #         db.query(RecommendationHistory)
# #         .filter(RecommendationHistory.user_id == current_user)
# #         .order_by(RecommendationHistory.timestamp.desc())
# #         .all()
# #     )

# #     return history



# from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session
# from datetime import datetime

# from backend.db import get_db
# from backend import models
# from backend.dependencies import get_current_user
# from backend.recommender import recommend
# from backend.models import RecommendationHistory

# import joblib
# import os
# import pandas as pd
# print("🔥 ROUTE FILE LOADED 🔥")

# router = APIRouter(tags=["Recommend"])

# # ================= LOAD ML MODEL =================
# BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# model_path = os.path.join(BASE_DIR, "ml", "domain_model.pkl")
# model = joblib.load(model_path)


# # ================= BUILD ML INPUT FROM EXISTING FORM =================
# def build_ml_input_from_payload(payload):

#     # Default base scores
#     aptitude = payload.get("tenth_percentage") or payload.get("inter_percentage") or 70

#     logical = 60
#     creativity = 60
#     technical = 60
#     communication = 60
#     problem_solving = 60

#     subjects = payload.get("subjects", [])
#     strengths = payload.get("strengths", [])
#     interests = payload.get("interests", [])

#     # ===== SUBJECT MAPPING =====
#     if "Mathematics" in subjects:
#         logical += 15
#         problem_solving += 10

#     if "Computers" in subjects:
#         technical += 20

#     if "Physics" in subjects:
#         logical += 10

#     if "Biology" in subjects:
#         logical += 10

#     if "Arts" in subjects:
#         creativity += 15

#     # ===== STRENGTH MAPPING =====
#     if "Problem Solving" in strengths:
#         problem_solving += 20

#     if "Creativity" in strengths:
#         creativity += 20

#     if "Technology" in strengths:
#         technical += 20

#     if "Communication" in strengths:
#         communication += 20

#     if "Analysis" in strengths:
#         logical += 15

#     # ===== INTEREST MAPPING (After Inter) =====
#     tech_keywords = [
#         "Artificial Intelligence",
#         "Machine Learning",
#         "Data Science",
#         "Web Development",
#         "Robotics",
#         "Cloud Computing",
#         "Blockchain"
#     ]

#     design_keywords = ["UI/UX Design", "Design"]

#     business_keywords = [
#         "Finance",
#         "Business Management",
#         "Economics",
#         "Stock Market"
#     ]

#     for interest in interests:
#         if interest in tech_keywords:
#             technical += 15
#             logical += 10

#         if interest in design_keywords:
#             creativity += 15

#         if interest in business_keywords:
#             communication += 15

#     return {
#         "aptitude_score": min(aptitude, 100),
#         "logical_score": min(logical, 100),
#         "creativity_score": min(creativity, 100),
#         "technical_score": min(technical, 100),
#         "communication_score": min(communication, 100),
#         "problem_solving_score": min(problem_solving, 100),
#     }


# # ================= ML PREDICTION =================
# def predict_domain_ml(user_input):

#     input_df = pd.DataFrame([user_input])
#     probabilities = model.predict_proba(input_df)[0]
#     prediction = model.predict(input_df)[0]
#     confidence = max(probabilities)

#     return prediction, confidence


# # ================= MAIN ROUTE =================
# @router.post("/recommend")
# def get_recommendation(
#     payload: dict,
#     db: Session = Depends(get_db),
#     current_user: int = Depends(get_current_user)
# ):

#     # ===== Get User Profile =====
#     user_profile = (
#         db.query(models.Profile)
#         .filter(models.Profile.user_id == current_user)
#         .first()
#     )

#     profile_dict = None
    
#     if user_profile:
#         profile_dict = {
#             "tenth_percentage": user_profile.tenth_percentage,
#             "inter_stream": user_profile.inter_stream,
#             "location": user_profile.location
#         }

#     payload["user_id"] = current_user

#     # ===== ML Prediction =====
#     try:
#         ml_input = build_ml_input_from_payload(payload)
#         predicted_domain, confidence = predict_domain_ml(ml_input)

#         payload["ml_predicted_domain"] = predicted_domain
#         payload["ml_confidence"] = round(confidence * 100, 2)

#     except Exception as e:
#         print("ML Error:", e)
#         payload["ml_predicted_domain"] = None
#         payload["ml_confidence"] = None
    
#     # ===== FIX MARKS + STAGE PROPERLY =====
#     # if "percentage" in payload:
#     #     payload["marks"] = payload["percentage"]

#     #     if payload.get("stage") == "after 10th":
#     #         payload["stage"] = "after10th"
#     #     else:
#     #         payload["stage"] = "afterinter"
#     # ===== FIX MARKS + STAGE PROPERLY =====
#     if "percentage" in payload:
#         payload["marks"] = payload["percentage"]

#     # keep stage exactly as frontend sends (just clean formatting)
#     payload["stage"] = payload.get("stage", "").replace(" ", "").lower()


#     # ===== Run Your Existing Recommender =====
#     recommendations = recommend(payload, profile_dict, db)

#     # ===== Save History =====
#     if isinstance(recommendations, dict) and "results" in recommendations:

#         results = recommendations.get("results", [])

#         for item in results:
#             career = item.get("career_path")
#             score = item.get("recommendation_score")

#             if career and score:
#                 history = RecommendationHistory(
#                     user_id=current_user,
#                     recommended_stream=career,
#                     score=str(score),
#                     timestamp=datetime.utcnow()
#                 )

#                 db.add(history)

#         db.commit()

#     return {
#         "ml_predicted_domain": payload.get("ml_predicted_domain"),
#         "ml_confidence": payload.get("ml_confidence"),
#         "recommendations": recommendations
#     }


# # ================= HISTORY =================
# @router.get("/history")
# def get_history(
#     db: Session = Depends(get_db),
#     current_user: int = Depends(get_current_user)
# ):

#     history = (
#         db.query(RecommendationHistory)
#         .filter(RecommendationHistory.user_id == current_user)
#         .order_by(RecommendationHistory.timestamp.desc())
#         .all()
#     )

#     return history


# from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session
# from datetime import datetime

# from backend.db import get_db
# from backend import models
# from backend.dependencies import get_current_user
# from backend.recommender import recommend
# from backend.models import RecommendationHistory

# import joblib
# import os
# import pandas as pd

# print("🔥 ROUTE FILE LOADED 🔥")

# router = APIRouter(tags=["Recommend"])

# # ================= LOAD ML MODEL =================
# BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# model_path = os.path.join(BASE_DIR, "ml", "domain_model.pkl")
# model = joblib.load(model_path)


# # ================= BUILD ML INPUT =================
# def build_ml_input_from_payload(payload):

#     aptitude = payload.get("percentage", 70)

#     logical = 60
#     creativity = 60
#     technical = 60
#     communication = 60
#     problem_solving = 60

#     interests = payload.get("interests", [])

#     tech_keywords = [
#         "Artificial Intelligence",
#         "Machine Learning",
#         "Data Science",
#         "Web Development",
#         "Robotics",
#         "Cloud Computing",
#         "Blockchain"
#     ]

#     design_keywords = ["UI/UX Design", "Design"]

#     business_keywords = [
#         "Finance",
#         "Business Management",
#         "Economics",
#         "Stock Market"
#     ]

#     for interest in interests:
#         if interest in tech_keywords:
#             technical += 15
#             logical += 10
#         if interest in design_keywords:
#             creativity += 15
#         if interest in business_keywords:
#             communication += 15

#     return {
#         "aptitude_score": min(aptitude, 100),
#         "logical_score": min(logical, 100),
#         "creativity_score": min(creativity, 100),
#         "technical_score": min(technical, 100),
#         "communication_score": min(communication, 100),
#         "problem_solving_score": min(problem_solving, 100),
#     }


# # ================= ML PREDICTION =================
# def predict_domain_ml(user_input):
#     input_df = pd.DataFrame([user_input])
#     probabilities = model.predict_proba(input_df)[0]
#     prediction = model.predict(input_df)[0]
#     confidence = max(probabilities)
#     return prediction, confidence


# # ================= MAIN ROUTE =================
# @router.post("/recommend")
# def get_recommendation(
#     payload: dict,
#     db: Session = Depends(get_db),
#     current_user: int = Depends(get_current_user)
# ):

#     payload["user_id"] = current_user

#     # ===== Fix Marks + Stage Properly =====
#     payload["marks"] = payload.get("percentage", 0)
#     # payload["stage"] = payload.get("stage", "").replace(" ", "").lower()
#     stage_input = payload.get("stage", "").lower()

#     if "10" in stage_input:
#         payload["stage"] = "after10th"
#     elif "12" in stage_input or "inter" in stage_input:
#         payload["stage"] = "after12th"
#     else:
#         payload["stage"] = ""

#     # Decide how many results to return
#     if payload.get("view_all"):
#         payload["view_all"] = True
#     else:
#         payload["top_n"] = 3

#     # ===== ML Prediction =====
#     try:
#         ml_input = build_ml_input_from_payload(payload)
#         predicted_domain, confidence = predict_domain_ml(ml_input)

#     except Exception as e:
#         print("ML Error:", e)
#         predicted_domain = None
#         confidence = None

#     # ===== Run Recommender =====
#     recommendations = recommend(payload, None, db)

#     # ===== Save History =====
#     if isinstance(recommendations, dict) and "results" in recommendations:
#         for item in recommendations["results"]:
#             history = RecommendationHistory(
#                 user_id=current_user,
#                 recommended_stream=item.get("career_path"),
#                 score=item.get("recommendation_score"),
#                 timestamp=datetime.utcnow()
#             )
#             db.add(history)
#         db.commit()

#     # ===== MERGE ML INFO INTO RESPONSE =====
#     if isinstance(recommendations, dict):
#         recommendations["ml_predicted_domain"] = predicted_domain
#         recommendations["ml_confidence"] = (
#             round(confidence * 100, 2) if confidence else None
#         )

#     return recommendations


# from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session
# from datetime import datetime

# from backend.db import get_db
# from backend import models
# from backend.dependencies import get_current_user
# from backend.recommender import recommend
# from backend.models import RecommendationHistory

# import joblib
# import os
# import pandas as pd

# print("🔥 ROUTE FILE LOADED 🔥")

# router = APIRouter(tags=["Recommend"])

# # ================= LOAD ML MODEL =================
# BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# model_path = os.path.join(BASE_DIR, "ml", "domain_model.pkl")
# model = joblib.load(model_path)


# # ================= BUILD ML INPUT =================
# def build_ml_input_from_payload(payload):

#     aptitude = payload.get("percentage", 70)

#     logical = 60
#     creativity = 60
#     technical = 60
#     communication = 60
#     problem_solving = 60

#     interests = payload.get("interests", [])

#     tech_keywords = [
#         "Artificial Intelligence",
#         "Machine Learning",
#         "Data Science",
#         "Web Development",
#         "Robotics",
#         "Cloud Computing",
#         "Blockchain"
#     ]

#     for interest in interests:
#         if interest in tech_keywords:
#             technical += 15
#             logical += 10

#     return {
#         "aptitude_score": min(aptitude, 100),
#         "logical_score": min(logical, 100),
#         "creativity_score": min(creativity, 100),
#         "technical_score": min(technical, 100),
#         "communication_score": min(communication, 100),
#         "problem_solving_score": min(problem_solving, 100),
#     }


# # ================= ML PREDICTION =================
# def predict_domain_ml(user_input):
#     input_df = pd.DataFrame([user_input])
#     probabilities = model.predict_proba(input_df)[0]
#     prediction = model.predict(input_df)[0]
#     confidence = max(probabilities)
#     return prediction, confidence


# # ================= MAIN ROUTE =================
# @router.post("/recommend")
# def get_recommendation(
#     payload: dict,
#     db: Session = Depends(get_db),
#     current_user: int = Depends(get_current_user)
# ):

#     payload["user_id"] = current_user

#     # ===== FIX MARKS =====
#     payload["marks"] = payload.get("percentage", 0)

#     # ===== FIX STAGE CORRECTLY =====
#     stage_raw = payload.get("stage", "").lower()

#     if "10" in stage_raw:
#         payload["stage"] = "after10th"
#     elif "inter" in stage_raw or "12" in stage_raw:
#         payload["stage"] = "after12th"
#     else:
#         payload["stage"] = ""

#     # ===== SET TOP N (default 3) =====
#     payload["top_n"] = 3

#     # ===== ML Prediction =====
#     try:
#         ml_input = build_ml_input_from_payload(payload)
#         predicted_domain, confidence = predict_domain_ml(ml_input)
#     except Exception as e:
#         print("ML Error:", e)
#         predicted_domain = None
#         confidence = None

#     # ===== RUN RECOMMENDER =====
#     recommendations = recommend(payload, None, db)

#     # ===== SAVE HISTORY =====
#     if isinstance(recommendations, dict) and "results" in recommendations:
#         for item in recommendations["results"]:
#             history = RecommendationHistory(
#                 user_id=current_user,
#                 recommended_stream=item.get("career_path"),
#                 score=item.get("recommendation_score"),
#                 timestamp=datetime.utcnow()
#             )
#             db.add(history)
#         db.commit()

#     # ===== MERGE ML INFO =====
#     if isinstance(recommendations, dict):
#         recommendations["ml_predicted_domain"] = predicted_domain
#         recommendations["ml_confidence"] = (
#             round(confidence * 100, 2) if confidence else None
#         )

#     return recommendations


# from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session
# from datetime import datetime

# from backend.db import get_db
# from backend.dependencies import get_current_user
# from backend.recommender import recommend
# from backend.models import RecommendationHistory

# import joblib
# import os
# import pandas as pd

# print("🔥 ROUTE FILE LOADED 🔥")

# router = APIRouter(tags=["Recommend"])

# # ================= LOAD ML MODEL =================
# BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# model_path = os.path.join(BASE_DIR, "ml", "domain_model.pkl")
# model = joblib.load(model_path)


# # ================= BUILD ML INPUT =================
# # def build_ml_input_from_payload(payload):

# #     aptitude = payload.get("marks", 70)

# #     logical = 60
# #     creativity = 60
# #     technical = 60
# #     communication = 60
# #     problem_solving = 60

# #     interests = payload.get("interests", [])

# #     tech_keywords = [
# #         "Artificial Intelligence",
# #         "Machine Learning",
# #         "Data Science",
# #         "Web Development",
# #         "Robotics",
# #         "Cloud Computing",
# #         "Blockchain"
# #     ]

# #     for interest in interests:
# #         if interest in tech_keywords:
# #             technical += 15
# #             logical += 10

# #     return {
# #         "aptitude_score": min(aptitude, 100),
# #         "logical_score": min(logical, 100),
# #         "creativity_score": min(creativity, 100),
# #         "technical_score": min(technical, 100),
# #         "communication_score": min(communication, 100),
# #         "problem_solving_score": min(problem_solving, 100),
# #     }
# def build_ml_input_from_payload(payload):

#     aptitude = payload.get("marks", 70)

#     # Base scores
#     logical = 50
#     creativity = 50
#     technical = 50
#     communication = 50
#     problem_solving = 50

#     interests = payload.get("interests", [])
#     stream = payload.get("stream", "").lower()

#     # ---------- STREAM BASED BOOST ----------
#     if "mpc" in stream:
#         logical += 20
#         technical += 20
#         problem_solving += 15

#     elif "bipc" in stream:
#         communication += 20
#         creativity += 10

#     elif "cec" in stream or "commerce" in stream:
#         communication += 25
#         logical += 10

#     # ---------- INTEREST BASED BOOST ----------
#     for interest in interests:

#         interest = interest.lower()

#         if "ai" in interest or "machine" in interest or "data" in interest:
#             technical += 20
#             logical += 15

#         elif "design" in interest or "ui" in interest:
#             creativity += 25
#             communication += 15

#         elif "security" in interest or "cyber" in interest:
#             technical += 20
#             problem_solving += 20

#         elif "management" in interest or "business" in interest:
#             communication += 25

#     return {
#         "aptitude_score": min(aptitude, 100),
#         "logical_score": min(logical, 100),
#         "creativity_score": min(creativity, 100),
#         "technical_score": min(technical, 100),
#         "communication_score": min(communication, 100),
#         "problem_solving_score": min(problem_solving, 100),
#     }

# # ================= ML PREDICTION =================
# def predict_domain_ml(user_input):
#     input_df = pd.DataFrame([user_input])
#     probabilities = model.predict_proba(input_df)[0]
#     prediction = model.predict(input_df)[0]
#     confidence = max(probabilities)
#     return prediction, confidence


# # ================= MAIN ROUTE =================
# @router.post("/recommend")
# def get_recommendation(
#     payload: dict,
#     db: Session = Depends(get_db),
#     current_user: int = Depends(get_current_user)
# ):

#     payload["user_id"] = current_user

#     # ✅ DO NOT OVERRIDE MARKS
#     payload["marks"] = payload.get("marks", 0)

#     # ✅ FIX STAGE PROPERLY
#     stage_raw = payload.get("stage", "").lower()

#     if "10" in stage_raw:
#         payload["stage"] = "after10th"
#     elif "12" in stage_raw or "inter" in stage_raw:
#         payload["stage"] = "after12th"
#     else:
#         payload["stage"] = ""

#     # ✅ Handle Top 3 vs Explore All
#     payload["top_n"] = payload.get("top_n", 3)
#     payload["view_all"] = payload.get("view_all", False)

#     # ===== ML Prediction =====
#     try:
#         ml_input = build_ml_input_from_payload(payload)
#         predicted_domain, confidence = predict_domain_ml(ml_input)
#     except Exception as e:
#         print("ML Error:", e)
#         predicted_domain = None
#         confidence = None

#     # ===== Run Recommender =====
#     recommendations = recommend(payload, None, db)

#     # ===== Save History =====
#     if isinstance(recommendations, dict) and "results" in recommendations:
#         for item in recommendations["results"]:
#             history = RecommendationHistory(
#                 user_id=current_user,
#                 recommended_stream=item.get("career_path"),
#                 score=item.get("recommendation_score"),
#                 timestamp=datetime.utcnow()
#             )
#             db.add(history)
#         db.commit()


#     # ===== Attach ML Info =====
#     if isinstance(recommendations, dict) and "results" in recommendations:

#         for item in recommendations["results"]:

#             # ⭐ If ML confidence is low → align with recommendation
#             final_prediction = predicted_domain

#             if confidence is not None and confidence < 0.45:
#                 final_prediction = "General Technical Domain"

#             item["ml_predicted_domain"] = final_prediction
#             item["ml_confidence"] = (
#                 round(confidence * 100, 2) if confidence else None
#             )

#     return recommendations

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime

from backend.db import get_db
from backend.dependencies import get_current_user
from backend.recommender import recommend
from backend.models import RecommendationHistory

import joblib
import os
import pandas as pd

print("🔥 ROUTE FILE LOADED 🔥")

router = APIRouter(tags=["Recommend"])

# ================= LOAD ML MODEL =================
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
model_path = os.path.join(BASE_DIR, "ml", "domain_model.pkl")
model = joblib.load(model_path)


# ================= BUILD ML INPUT =================
def build_ml_input_from_payload(payload):

    aptitude = payload.get("marks", 70)

    # Base scores
    logical = 50
    creativity = 50
    technical = 50
    communication = 50
    problem_solving = 50

    interests = payload.get("interests", [])
    stream = payload.get("stream", "").lower()

    # ---------- STREAM BASED BOOST ----------
    if "mpc" in stream:
        logical += 20
        technical += 20
        problem_solving += 15

    elif "bipc" in stream:
        communication += 20
        creativity += 10

    elif "cec" in stream or "commerce" in stream:
        communication += 25
        logical += 10

    # ---------- INTEREST BASED BOOST ----------
    for interest in interests:

        interest = interest.lower()

        if "ai" in interest or "machine" in interest or "data" in interest:
            technical += 20
            logical += 15

        elif "design" in interest or "ui" in interest:
            creativity += 25
            communication += 15

        elif "security" in interest or "cyber" in interest:
            technical += 20
            problem_solving += 20

        elif "management" in interest or "business" in interest:
            communication += 25

    return {
        "aptitude_score": min(aptitude, 100),
        "logical_score": min(logical, 100),
        "creativity_score": min(creativity, 100),
        "technical_score": min(technical, 100),
        "communication_score": min(communication, 100),
        "problem_solving_score": min(problem_solving, 100),
    }


# ================= ML PREDICTION =================
def predict_domain_ml(user_input):
    input_df = pd.DataFrame([user_input])
    probabilities = model.predict_proba(input_df)[0]
    prediction = model.predict(input_df)[0]
    confidence = max(probabilities)
    return prediction, confidence


# ================= MAIN ROUTE =================
@router.post("/recommend")
def get_recommendation(
    payload: dict,
    db: Session = Depends(get_db),
    current_user: int = Depends(get_current_user)
):

    payload["user_id"] = current_user
    payload["marks"] = payload.get("marks", 0)

    # ---------- FIX STAGE ----------
    stage_raw = payload.get("stage", "").lower()

    # if "10" in stage_raw:
    if any(x in stage_raw for x in ["10", "ssc", "tenth"]):
        payload["stage"] = "after10th"
    # elif "12" in stage_raw or "inter" in stage_raw:
    elif any(x in stage_raw for x in ["12", "inter", "intermediate"]):
        payload["stage"] = "after12th"
    else:
        payload["stage"] = ""

    payload["top_n"] = payload.get("top_n", 3)
    payload["view_all"] = payload.get("view_all", False)

    # ===== ML Prediction =====
    try:
        ml_input = build_ml_input_from_payload(payload)
        predicted_domain, confidence = predict_domain_ml(ml_input)
    except Exception as e:
        print("ML Error:", e)
        predicted_domain = None
        confidence = None

    # ===== Run Recommender =====
    # recommendations = recommend(payload, None, db)
    recommendations = recommend(
        payload,
        {"predicted_domain": predicted_domain},
        db 
    )

    # ===== Save History =====
    if isinstance(recommendations, dict) and "results" in recommendations:
        for item in recommendations["results"]:
            history = RecommendationHistory(
                user_id=current_user,
                recommended_stream=item.get("career_path"),
                score=item.get("recommendation_score"),
                timestamp=datetime.utcnow()
            )
            db.add(history)
        db.commit()


    return recommendations