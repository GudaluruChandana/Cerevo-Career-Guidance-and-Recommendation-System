from fastapi import APIRouter
from fastapi.responses import FileResponse
from backend.pdf_generator import generate_roadmap_pdf
import uuid
import os

router = APIRouter()

@router.post("/download-roadmap")
def download_roadmap(data: dict):

    filename = f"career_roadmap_{uuid.uuid4().hex}.pdf"
    file_path = f"backend/roadmaps/{filename}"

    os.makedirs("backend/roadmaps", exist_ok=True)

    # Generate branded PDF
    generate_roadmap_pdf(data, file_path)

    # Return file directly for download
    return FileResponse(
        path=file_path,
        filename=filename,
        media_type="application/pdf"
    )
