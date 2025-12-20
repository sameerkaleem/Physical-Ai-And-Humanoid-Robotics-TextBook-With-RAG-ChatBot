# Docusaurus RAG Chatbot Integration Constitution

## Core Principles

### Provider Strictness
EXCLUSIVE use of Cohere API for Embeddings and Chat (No OpenAI). All embedding and language model operations must utilize Cohere's services exclusively, specifically Cohere `embed-english-v3.0` or `embed-multilingual-v3.0` for embeddings and `command-r` or `command-r-plus` for generation. This ensures consistent performance and cost predictability within the established provider ecosystem.

### Architecture Decoupling
FastAPI backend for logic/RAG, Docusaurus frontend for UI. The system architecture must maintain strict separation between backend services handling retrieval-augmented generation logic and the Docusaurus-based frontend. This enables independent scaling, maintenance, and technology updates for each component without cross-dependencies.

### Context Awareness
System must handle both full-document queries and user-highlighted text queries. The RAG system must be capable of processing different query contexts: full document searches across textbook chunks and focused queries based on user-selected/highlighted text portions, providing appropriately scoped and contextualized responses for each scenario.

### Cost Efficiency
Architecture must fit within Qdrant Cloud Free Tier and Neon Serverless Free Tier. All infrastructure decisions must prioritize cost-effectiveness by leveraging free tier resources where possible, implementing efficient data storage strategies, and optimizing API usage patterns to maintain operational costs within budgetary constraints.

### Technical Standards Compliance
Backend stack limited to Python 3.10+, FastAPI, Cohere SDK, Qdrant Client, and AsyncPG for Neon integration. Frontend must utilize React with Docusaurus swizzled components and optional TailwindCSS for styling. Qdrant collection `textbook_chunks` must use payload indexing for efficient retrieval operations.

### Performance and Scalability
The system must be designed to handle concurrent user sessions efficiently while maintaining responsive query times. Database schema for Neon Postgres must include tables for `chat_sessions` and `messages` with appropriate indexing for optimal retrieval performance.

## Technical Standards
Backend: Python 3.10+, FastAPI, Cohere SDK (`cohere`), Qdrant Client (`qdrant-client`), AsyncPG (for Neon).
Frontend: React (Docusaurus Swizzled Components), TailwindCSS (optional for styling chat widget).
Embeddings: Cohere `embed-english-v3.0` (1024 dimensions) or `embed-multilingual-v3.0`.
LLM Model: Cohere `command-r` or `command-r-plus` for generation.
Database Schema: Qdrant: Collection `textbook_chunks` with payload indexing; Neon Postgres: Tables for `chat_sessions`, `messages`.

## Development Workflow
All development must follow test-driven development practices with comprehensive unit and integration tests. Code reviews must verify compliance with architectural principles, API usage restrictions, and performance requirements. New features must include appropriate monitoring and logging capabilities.

## Governance

All implementations must comply with the specified architecture constraints. Changes to core principles require explicit documentation and approval. Any deviation from the prescribed technology stack or provider restrictions must be justified with clear technical rationale and approved by the project maintainers.

**Version**: 1.0.0 | **Ratified**: 2025-12-16 | **Last Amended**: 2025-12-16
