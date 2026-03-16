
from fastapi import FastAPI

from backend.db import Base, engine

from backend.routes.auth import router as auth_router
from backend.routes.profile import router as profile_router
from backend.routes.courses import router as courses_router
from backend.routes.colleges import router as colleges_router
from backend.routes.recommend import router as recommend_router
# from backend.routes import recommend
from backend.routes.roadmap import router as roadmap_router
from fastapi.middleware.cors import CORSMiddleware
# app.include_router(recommend.router)
from backend.local_ai import router as ai_router

from backend.routes.history import router as history_router

app = FastAPI(title="CEREVO Career Recommendation API")
from fastapi.openapi.utils import get_openapi


app.include_router(ai_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",   # ✅ ADD THIS
        "http://127.0.0.1:5174"    # ✅ ADD THIS (safe)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema

    openapi_schema = get_openapi(
        title=app.title,
        version="1.0.0",
        description="Career Recommendation API",
        routes=app.routes,
    )

    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header",
            "description": "Enter: **Bearer &lt;token&gt;**"
        }
    }

    openapi_schema["security"] = [{"BearerAuth": []}]

    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi

# ✅ VERY IMPORTANT (creates users & profiles tables)
Base.metadata.create_all(bind=engine)

# Routes
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(profile_router, prefix="/profile", tags=["Profile"])
app.include_router(courses_router, tags=["Courses"])
app.include_router(colleges_router, tags=["Colleges"])
app.include_router(recommend_router, tags=["Recommend"])
app.include_router(roadmap_router,tags=["Roadmap"])

app.include_router(history_router, prefix="/history")

@app.get("/")
def root():
    return {"message": "CEREVO Backend Running Successfully"}
