from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
print("GEMINI_API_KEY:", GEMINI_API_KEY)
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.5-flash')



app = FastAPI(title="AI Medical Chatbot API")

# ✅ CORS (allow frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FrontEnd_URL")],  # for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str


@app.post("/chat", response_model=ChatResponse)
def chat_with_ai(req: ChatRequest):
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    prompt = f"""
You are an AI medical symptom assistant.

Rules:
- NEVER give a diagnosis.
- Use phrases like "possible condition".
- Recommend the relevant medical department.
- If symptoms are severe, advise emergency services (108).
- Always include a medical disclaimer.
- Handle spelling mistakes gracefully.
- Give Solution in 50 words  or less

User symptoms:
{req.message}
"""
    # print(model)
    response= model.generate_content(prompt)
    return {"reply": response.text.strip()}

    # except requests.exceptions.RequestException as e:
    #     raise HTTPException(status_code=500, detail=str(e))
