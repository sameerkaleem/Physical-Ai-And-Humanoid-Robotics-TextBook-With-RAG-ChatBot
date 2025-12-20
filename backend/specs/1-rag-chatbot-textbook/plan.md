# Implementation Plan: RAG Chatbot for Physical AI & Humanoid Robotics Textbook

**Branch**: `1-rag-chatbot-textbook` | **Date**: 2025-12-16 | **Spec**: [link to spec](../specs/1-rag-chatbot-textbook/spec.md)
**Input**: Feature specification from `/specs/1-rag-chatbot-textbook/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implementation of a RAG (Retrieval-Augmented Generation) chatbot for the Physical AI & Humanoid Robotics textbook. The system will provide students with immediate clarification on complex concepts by allowing them to ask questions about the textbook content. The solution includes a floating "Ask AI" button on all textbook pages, text selection functionality, and conversational memory to handle follow-up questions.

## Technical Context

**Language/Version**: Python 3.10+ (as specified in constitution)
**Primary Dependencies**: FastAPI, Cohere SDK, Qdrant Client, AsyncPG, python-dotenv
**Storage**: Qdrant (vector database), Neon Postgres (session storage)
**Testing**: pytest (recommended for FastAPI applications)
**Target Platform**: Linux server (Docker container deployment)
**Project Type**: Web (backend API + Docusaurus frontend integration)
**Performance Goals**: Response time under 5 seconds, 95% uptime, 100 concurrent users
**Constraints**: Must fit within Qdrant Cloud Free Tier and Neon Serverless Free Tier, 3-second timeout for vector searches
**Scale/Scope**: Supports textbook readers and students, handles 1000+ questions per day

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Based on the project constitution:
1. **Provider Strictness**: ✅ EXCLUSIVE use of Cohere API for Embeddings and Chat (No OpenAI) - confirmed
2. **Architecture Decoupling**: ✅ FastAPI backend for logic/RAG, Docusaurus frontend for UI - confirmed
3. **Cost Efficiency**: ✅ Architecture must fit within Qdrant Cloud Free Tier and Neon Serverless Free Tier - confirmed
4. **Technical Standards Compliance**: ✅ Using Python 3.10+, FastAPI, Cohere SDK, Qdrant Client, and AsyncPG - confirmed
5. **Performance and Scalability**: ✅ Design for concurrent users and responsive query times - confirmed

## Project Structure

### Documentation (this feature)

```text
specs/1-rag-chatbot-textbook/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
backend/
├── app/
│   ├── main.py          # FastAPI application entry point
│   ├── rag_engine.py    # Core RAG logic
│   └── database.py      # Database connection and session management
├── scripts/
│   └── ingest.py        # Knowledge base ingestion pipeline
├── .env                 # Environment variables
├── Dockerfile           # Docker configuration
├── requirements.txt     # Python dependencies
└── tests/
    ├── unit/
    ├── integration/
    └── contract/
```

```text
frontend/
├── src/
│   ├── components/
│   │   └── ChatWidget.tsx  # React component for the chat interface
│   └── services/
│       └── api.ts          # API service for backend communication
```

**Structure Decision**: Web application with decoupled backend and frontend components following the architecture decoupling principle from the constitution. Backend handles RAG logic and API, while frontend integrates with Docusaurus as a swizzled component.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |