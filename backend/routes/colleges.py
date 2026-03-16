from fastapi import APIRouter
from backend.data_loader import load_colleges

router = APIRouter(prefix="/colleges", tags=["Colleges"])

@router.get("")
def get_colleges():
    print(">>> COLLEGES ROUTE HIT <<<")
    return load_colleges()
