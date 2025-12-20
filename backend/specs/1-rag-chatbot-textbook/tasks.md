# Tasks: RAG Chatbot for Physical AI & Humanoid Robotics Textbook

**Feature**: RAG Chatbot for Physical AI & Humanoid Robotics Textbook
**Branch**: `1-rag-chatbot-textbook`
**Created**: 2025-12-16
**Status**: Draft

## Implementation Strategy

This implementation follows a phased approach starting with core infrastructure and progressing through user stories in priority order. The MVP will focus on User Story 1 (basic Q&A functionality) before adding advanced features like text selection and chat history.

## Dependencies

- User Story 1 (P1) must be completed before User Story 2 (P1) and User Story 3 (P2)
- Foundational tasks must be completed before any user stories

## Parallel Execution Examples

- Database setup and RAG engine development can run in parallel (different files)
- Frontend component creation can run in parallel with backend API development
- Verification scripts can be developed in parallel with main implementation

---

## Phase 1: Setup

**Goal**: Initialize project structure and dependencies

- [X] T001 Create backend directory structure per implementation plan
- [X] T002 Create frontend directory structure per implementation plan
- [X] T003 Create `.env` file with COHERE_API_KEY, QDRANT credentials, and NEON_DB_URL
- [X] T004 Create `requirements.txt` with FastAPI, uvicorn[standard], cohere, qdrant-client, asyncpg, python-dotenv, pydantic
- [X] T005 Install Python dependencies using pip

## Phase 2: Foundational

**Goal**: Implement core infrastructure needed by all user stories

- [X] T006 Create `scripts/verify_connections.py` to test Cohere, Qdrant, and Neon connections
- [X] T007 Run connection verification script to confirm access to all services
- [X] T008 Create `scripts/ingest.py` for knowledge base ingestion pipeline
- [X] T009 Implement `parse_docs()` function to recursively find .md files in docs/ folder
- [X] T010 Implement `chunk_text()` function to split text by H2/H3 headers
- [X] T011 Implement `embed_and_index()` function to generate embeddings and upsert to Qdrant
- [X] T012 Create `app/database.py` with asyncpg connection pool for Neon
- [X] T013 Create `chat_history` table in Neon with columns: id, session_id, user_query, ai_response, timestamp
- [X] T014 Create `app/rag_engine.py` with core RAG logic
- [X] T015 Implement query embedding logic in rag_engine.py
- [X] T016 Implement Qdrant querying logic (top 3 results) in rag_engine.py
- [X] T017 Implement conversational memory logic (fetch last 3 messages) in rag_engine.py
- [X] T018 Implement prompt construction logic for Cohere command-r in rag_engine.py
- [X] T019 Create `Dockerfile` for FastAPI backend with proper entrypoint
- [X] T020 Create `vercel.json` for backend deployment configuration

## Phase 3: User Story 1 - Ask Questions about Textbook Content (Priority: P1)

**Goal**: Enable students to ask questions about textbook content and receive relevant answers

**Independent Test**: Can be fully tested by asking a question about textbook content and receiving a relevant answer that is grounded in the textbook's information.

- [X] T021 [US1] Create `app/main.py` with FastAPI application
- [X] T022 [US1] Define Pydantic models: ChatRequest and ChatResponse
- [X] T023 [US1] Implement POST /api/chat endpoint connecting to rag_engine
- [X] T024 [US1] Configure CORSMiddleware to allow frontend domain access
- [ ] T025 [US1] Test basic question answering functionality with textbook content
- [ ] T026 [US1] Verify response includes relevant textbook content
- [ ] T027 [US1] Verify response time is under 5 seconds (per success criteria)

## Phase 4: User Story 2 - Ask about Selected Text (Priority: P1)

**Goal**: Enable students to highlight specific text and ask questions about that selection

**Independent Test**: Can be fully tested by highlighting text on the page, clicking the "Ask about selection" button, and receiving an answer that specifically addresses the highlighted content.

- [X] T028 [P] [US2] Create `frontend/src/components/ChatWidget.tsx` with floating button UI
- [X] T029 [P] [US2] Implement handleSend() logic to POST to backend API in ChatWidget
- [X] T030 [P] [US2] Implement selectionListener() to capture document.getSelection() in ChatWidget
- [X] T031 [US2] Update POST /api/chat to accept selection_context parameter
- [X] T032 [US2] Modify rag_engine to prioritize selection_context in query construction
- [ ] T033 [US2] Test text selection functionality with highlighted content
- [ ] T034 [US2] Verify answers specifically address highlighted text
- [ ] T035 [US2] Run Docusaurus swizzle command to inject ChatWidget into global Layout

## Phase 5: User Story 3 - View Chat History (Priority: P2)

**Goal**: Log questions and answers for reference and quality review

**Independent Test**: Can be fully tested by asking questions, then verifying that they are properly logged in the database for review purposes.

- [ ] T036 [US3] Update database.py to properly store question-answer pairs in chat_history table
- [ ] T037 [US3] Implement POST /api/feedback endpoint for answer rating
- [ ] T038 [US3] Update chat endpoint to store session_id with each interaction
- [ ] T039 [US3] Implement session management with 24-hour inactivity timeout
- [ ] T040 [US3] Test chat history persistence across sessions
- [ ] T041 [US3] Verify feedback collection and storage

## Phase 6: Polish & Cross-Cutting Concerns

**Goal**: Complete the implementation with error handling, edge cases, and deployment readiness

- [ ] T042 Implement timeout mechanism for vector searches (3-second limit)
- [ ] T043 Add error handling for questions with no relevant matches in textbook
- [ ] T044 Add error handling for external AI service unavailability
- [ ] T045 Implement validation for question length (5-1000 characters)
- [ ] T046 Add handling for very long text selections
- [ ] T047 Implement network connectivity error handling
- [ ] T048 Add comprehensive logging for observability
- [ ] T049 Create health check endpoint (GET /health)
- [ ] T050 Test complete system integration
- [ ] T051 Verify all success criteria are met
- [ ] T052 Update docusaurus.config.js for production build compatibility
- [ ] T053 Document the complete API with examples
- [ ] T054 Perform final testing of all user stories
- [ ] T055 Prepare for production deployment

---

## Summary

**Total Tasks**: 55
**User Story 1 Tasks**: 7 (T021-T027)
**User Story 2 Tasks**: 8 (T028-T035)
**User Story 3 Tasks**: 6 (T036-T041)
**Parallel Opportunities**: 3 identified (T028/T029/T030 can run in parallel with backend work)
**MVP Scope**: Tasks T001-T027 (User Story 1 complete with foundational infrastructure)

**Independent Test Criteria**:
- US1: Ask question → receive relevant textbook-based answer within 5 seconds
- US2: Highlight text → ask question → receive answer specifically addressing highlighted content
- US3: Ask questions → verify storage in database → access previous interactions