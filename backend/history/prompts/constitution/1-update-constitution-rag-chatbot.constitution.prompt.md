---
id: 1
title: Update constitution for RAG Chatbot project
stage: constitution
date_iso: 2025-12-16
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: user
command: /sp.constitution
labels: ["constitution", "rag", "chatbot", "cohere"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - .specify/memory/constitution.md
tests_yaml: |
  - none
---

# Update constitution for RAG Chatbot project

## Original Prompt

```
Project: Docusaurus RAG Chatbot Integration (Physical AI & Humanoid Robotics)

Core principles:
- Provider Strictness: EXCLUSIVE use of Cohere API for Embeddings and Chat (No OpenAI).
- Architecture Decoupling: FastAPI backend for logic/RAG, Docusaurus frontend for UI.
- Context Awareness: System must handle both full-document queries and user-highlighted text queries.
- Cost Efficiency: Architecture must fit within Qdrant Cloud Free Tier and Neon Serverless Free Tier.

Key standards:
- Tech Stack Backend: Python 3.10+, FastAPI, Cohere SDK (`cohere`), Qdrant Client (`qdrant-client`), AsyncPG (for Neon).
- Tech Stack Frontend: React (Docusaurus Swizzled Components), TailwindCSS (optional for styling chat widget).
- Embeddings: Cohere `embed-english-v3.0` (1024 dimensions) or `embed-multilingual-v3.0`.
- LLM Model: Cohere `command-r` or `command-r-plus` for generation.
- Database Schema:
  - Qdrant: Collection `textbook_chunks` with payload payload indexing.
  - Neon Postgres: Tables for `chat_sessions`, `mess
```

## Response Summary

Updated the project constitution at `.specify/memory/constitution.md` with the specified principles for the Docusaurus RAG Chatbot Integration project. The new constitution includes:

- Core principles around provider strictness (Cohere only), architecture decoupling, context awareness, cost efficiency, technical standards compliance, and performance/scalability
- Technical standards section detailing backend and frontend tech stacks
- Development workflow requirements
- Governance section with version 1.0.0

## Outcome

Successfully created a comprehensive project constitution that captures all the specified requirements and principles for the RAG chatbot integration project. The constitution is now ready for use as a guiding document for the project.