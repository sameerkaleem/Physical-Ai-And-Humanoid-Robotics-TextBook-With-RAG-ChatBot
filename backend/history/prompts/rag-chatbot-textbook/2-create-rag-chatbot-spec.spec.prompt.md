---
id: 2
title: Create RAG chatbot spec for textbook
stage: spec
date_iso: 2025-12-16
surface: agent
model: claude-sonnet-4-5-20250929
feature: rag-chatbot-textbook
branch: 1-rag-chatbot-textbook
user: user
command: /sp.specify
labels: ["spec", "rag", "chatbot", "textbook"]
links:
  spec: ../specs/1-rag-chatbot-textbook/spec.md
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - specs/1-rag-chatbot-textbook/spec.md
  - specs/1-rag-chatbot-textbook/checklists/requirements.md
tests_yaml: |
  - none
---

# Create RAG chatbot spec for textbook

## Original Prompt

```
Integrated RAG Chatbot for "Physical AI & Humanoid Robotics" Textbook

Target audience: Readers and students of the Physical AI course who need immediate clarification on complex textbook concepts.
Focus: "Context-aware" Q&A using the specific textbook content, with a specialized "Ask about selection" feature.

Architecture & Credentials Setup:
- Create a `.env` file structure immediately to hold these secrets (DO NOT HARDCODE):
  - COHERE_API_KEY: "USER_COHERE_API_KEY"
  - QDRANT_URL: "USER_QDRANT_URL"
- QDRANT_API_KEY: "USER_QDRANT_API_KEY"
  - NEON_DB_URL: "USER_DB_URL"
  - QDRANT_CLUSTER_ID: "USER_ID"
- Backend: FastAPI service (Python) running on Railway/Vercel standards.
- Frontend: React component integrated into Docusaurus (via Swizzling).

Success criteria:
- **Backend Core**: A `rag_service.py` that connects to Qdrant (using Cohere `embed-english-v3.0` vectors) and generates answers via Cohere `command-r`.
- **Database Logic**: An AsyncPG connection to Neon that logs every user question and answer for quality review.
- **Frontend Widget**: A floating "Ask AI" button on the Docusaurus site. When text is highlighted by the mouse, the button should pulse or change text to "Ask about selection."
- **Backend Service**: A FastAPI application (`main.py`) that initializes the Cohere Client and Qdrant Client using the credentials above.
- **Vector Search Logic**: A function that takes user queries, converts them to embeddings using `cohere.embed-english-v3.0` (Dimension: 1024), and queries the Qdrant
- **Ingestion Script**: A `ingest.py` script that parses the existing Docusaurus Markdown (`.md`) files, chunks them, embeds them with Cohere, and uploads to Qdrant.
- **Deployment**:
  - A `Dockerfile` optimized for the Python backend.

Cloud cluster.
- **Frontend Integration**: A React component (`ChatWidget.js`) swizzled into Docusaurus that sends API requests to the FastAPI backend.
- **Selection Context**: The frontend must listen for text selection events. If text is selected, send it as `context_snippet` along with the prompt.
- **Deployment Config**:
  - A `Dockerfile` for the FastAPI backend.

Constraints:
- **Strictly No OpenAI**: Use `cohere` SDK for everything.
- **Vector Params**: Ensure Qdrant collection is created with size `1024` (matching Cohere v3 embeddings) and distance `Cosine`.
- **CORS**: FastAPI must have `CORSMiddleware` configured to allow requests from the GitHub Pages domain (`sameerkaleem.github.io`).
- **Latency**: Vector search must timeout after 3 seconds if no result found.
- Frontend: Hosted on vercel (`http://your_project.vercel.app`).
- Backend: Docker container (Railway/Vercel).
- **CORS**: The FastAPI backend must use `CORSMiddleware` to whitelist `local
```

## Response Summary

Created a comprehensive feature specification for the RAG Chatbot integration with the Physical AI & Humanoid Robotics textbook. The specification includes:

- Three prioritized user stories covering core functionality (asking questions, asking about selected text, and chat history)
- Eleven functional requirements defining system behavior
- Key entities involved in the system
- Seven measurable success criteria

The specification was initially created with some implementation details but was refined to be technology-agnostic and focused on user value and business needs. A quality checklist was created and validated to ensure the specification meets all requirements for planning.

## Outcome

The feature specification is complete and ready for the planning phase. It provides a clear, technology-agnostic description of the RAG chatbot feature that focuses on user needs and business outcomes while avoiding implementation details.