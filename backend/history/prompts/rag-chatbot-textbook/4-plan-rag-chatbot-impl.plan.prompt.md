---
id: 4
title: Plan RAG chatbot implementation
stage: plan
date_iso: 2025-12-16
surface: agent
model: claude-sonnet-4-5-20250929
feature: rag-chatbot-textbook
branch: 1-rag-chatbot-textbook
user: user
command: /sp.plan
labels: ["plan", "rag", "chatbot", "architecture"]
links:
  spec: ../specs/1-rag-chatbot-textbook/spec.md
  plan: ../specs/1-rag-chatbot-textbook/plan.md
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - specs/1-rag-chatbot-textbook/plan.md
  - specs/1-rag-chatbot-textbook/research.md
  - specs/1-rag-chatbot-textbook/data-model.md
  - specs/1-rag-chatbot-textbook/quickstart.md
  - specs/1-rag-chatbot-textbook/contracts/chat-api.yaml
tests_yaml: |
  - none
---

# Plan RAG chatbot implementation

## Original Prompt

```
Physical AI RAG Chatbot Implementation

Goal: Build and deploy a cohesive RAG system for the "Physical AI & Humanoid Robotics" Docusaurus book, utilizing a Dockerized FastAPI backend and a production-ready React frontend.

Phases:
1. **Environment & Secrets Initialization**:
   - Create the project structure and `.env` file using the provided Cohere, Qdrant, and Neon credentials.
   - Initialize a Python virtual environment and install core dependencies: `fastapi`, `uvicorn`, `cohere`, `qdrant-client`, `asyncpg`, `python-dotenv`.
   - **Verification Task**: Run a script to ping Qdrant Cloud and Cohere API to ensure keys are active.

2. **Knowledge Base Ingestion (The Pipeline)**:
   - Develop `scripts/ingest.py` to recursively scan Docusaurus `/docs` for `.md` and `.mdx` files.
   - Implement a chunking strategy that respects Markdown headers (to keep context intact).
   - **Action**: Generate embeddings via Cohere `embed-english-v3.0` and upsert payloads to the `textbook_chunks` collection in Qdrant.

3. **Backend Development (FastAPI)**:
   - Build `app/rag_engine.py`: The core logic that retrieves vectors from Qdrant and constructs the prompt for Cohere `command-r`.
   - **Crucial Feature**: Implement "Conversational Memory" — fetch the last 3-5 turns of conversation from Neon DB to include in the context window so the bot can handle follow-up questions.
   - Build `app/main.py`: Define API endpoints `/chat` (streamed response) and `/feedback`.
   - Setup `CORSMiddleware` to allow cross-origin requests from the production frontend URL.

4. **Frontend Integration (Docusaurus)**:
   - Component Creation: Build a `ChatWidget.tsx` using React hooks for state management (loading, streaming text, open/close).
   - **Selection Logic**: Implement the `mouseup` event listener to capture highlighted text and pass it as `selection_context` to the backend.
   - Swizzle: Inject this component into the Docusaurus `Layout` so it appears globally on every page.

5. **Production Deployment**:
   - **Backend**: Create a `Dock
```

## Response Summary

Created a comprehensive implementation plan for the RAG Chatbot feature, including:

- Implementation plan document (plan.md) with technical context and architecture
- Research document (research.md) with technology decisions and rationale
- Data model (data-model.md) defining entities and relationships
- Quickstart guide (quickstart.md) for setup and deployment
- API contract (contracts/chat-api.yaml) for the backend services

The plan follows the architecture decoupling principle from the constitution, using FastAPI backend with Cohere and Qdrant for RAG functionality, and React frontend for Docusaurus integration.

## Outcome

The implementation plan is complete with all Phase 0 and Phase 1 deliverables created. The plan aligns with the project constitution requirements and provides a clear roadmap for implementing the RAG chatbot system.