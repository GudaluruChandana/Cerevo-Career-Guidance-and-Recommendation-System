# from fastapi import APIRouter
# from pydantic import BaseModel
# import requests

# router = APIRouter()


# class ChatRequest(BaseModel):
#     message: str


# @router.post("/chat")
# async def chat(req: ChatRequest):

#     user_msg = req.message

#     # ChatGPT-style prompt
#     prompt = f"""
# You are a helpful AI career mentor for Indian students.

# Follow these rules strictly:

# - Use simple English
# - Give short answers
# - No long paragraphs
# - Use bold headings with **
# - Use bullet points with •
# - Maximum 6 points
# - No markdown symbols like ### or ***

# Format like this:

# **Title**

# • Point 1  
# • Point 2  
# • Point 3  

# **Tip:** short advice

# Now answer this question:

# {user_msg}
# """

#     response = requests.post(
#         "http://localhost:11434/api/generate",
#         json={
#             "model": "llama3",
#             "prompt": prompt,
#             "stream": False
#         },
#         timeout=120
#     )

#     data = response.json()

#     reply = data.get(
#         "response",
#         "Sorry, I couldn't generate a response."
#     )

#     return {"reply": reply}



# new code 
from fastapi import APIRouter
from pydantic import BaseModel
from groq import Groq
import os
from dotenv import load_dotenv
from pathlib import Path
import traceback

# Load .env from backend folder
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(env_path)

print("GROQ KEY:", os.getenv("GROQ_API_KEY"))
router = APIRouter()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
async def chat(request: ChatRequest):

    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful AI career mentor helping students with career guidance."
            },
            {
                "role": "user",
                "content": request.message
            }
        ],
        temperature=0.7,
        max_tokens=800
    )

    reply = completion.choices[0].message.content

    return {"reply": reply}