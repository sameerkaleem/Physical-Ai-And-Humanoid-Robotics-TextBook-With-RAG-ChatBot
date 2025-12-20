from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
import asyncio
from dotenv import load_dotenv

from app.rag_engine import rag_engine
from app.database import db_manager, init_db, close_db

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="RAG Chatbot API", version="1.0.0")

# Add CORS middleware to allow requests from frontend domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development - restrict in production
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["X-API-KEY", "Content-Type"," Authorization"],
)

# Pydantic models
class ChatRequest(BaseModel):
    question: str = Field(..., min_length=1, max_length=1000)
    session_id: Optional[str] = None
    selection_context: Optional[str] = None


class ChatResponse(BaseModel):
    answer: str
    sources: List[str]
    session_id: str


class FeedbackRequest(BaseModel):
    answer_id: str
    rating: str  # "positive" or "negative"
    comment: Optional[str] = None


# Event handlers for database connection
@app.on_event("startup")
async def startup_event():
    await init_db()


@app.on_event("shutdown")
async def shutdown_event():
    await close_db()


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": asyncio.get_event_loop().time()}


@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """
    Main chat endpoint that processes user questions and returns AI-generated answers
    """
    try:
        # Generate a session ID if not provided
        session_id = request.session_id or str(uuid.uuid4())

        # Process the query through the RAG engine
        result = await rag_engine.process_query(
            query=request.question,
            session_id=session_id,
            selection_context=request.selection_context
        )

        # Store the interaction in the database
        await db_manager.insert_chat_record(
            session_id=session_id,
            user_query=request.question,
            ai_response=result['answer']
        )

        return ChatResponse(
            answer=result['answer'],
            sources=result['sources'],
            session_id=session_id
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing query: {str(e)}")


@app.post("/api/feedback")
async def feedback_endpoint(request: FeedbackRequest):
    """
    Endpoint to collect feedback on answers
    """
    # In a real implementation, this would store feedback in a database
    # For now, we'll just log it
    print(f"Feedback received for answer {request.answer_id}: {request.rating}")
    if request.comment:
        print(f"Comment: {request.comment}")

    return {"status": "feedback recorded"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)