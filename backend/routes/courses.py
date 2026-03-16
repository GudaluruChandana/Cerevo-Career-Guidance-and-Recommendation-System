from fastapi import APIRouter
from backend.data_loader import load_courses

router = APIRouter(prefix="/courses", tags=["Courses"])

@router.get("")
def get_courses():
    print(">>> COURSES ROUTE HIT <<<")
    return load_courses()
