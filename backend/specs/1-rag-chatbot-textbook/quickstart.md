# Quickstart: RAG Chatbot for Physical AI & Humanoid Robotics Textbook

## Prerequisites

- Python 3.10+
- Docker (for containerized deployment)
- Access to Cohere API
- Access to Qdrant Cloud
- Access to Neon Postgres

## Setup

### 1. Clone and Initialize

```bash
# Clone the repository
git clone <repository-url>
cd <repository-name>

# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Environment Configuration

Create a `.env` file in the backend directory:

```env
COHERE_API_KEY="your_cohere_api_key"
QDRANT_URL="your_qdrant_url"
QDRANT_API_KEY="your_qdrant_api_key"
NEON_DB_URL="your_neon_db_url"
QDRANT_CLUSTER_ID="your_qdrant_cluster_id"
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Populate Knowledge Base

Run the ingestion script to process textbook content:

```bash
python scripts/ingest.py
```

This will:
- Scan the Docusaurus `/docs` directory for `.md` and `.mdx` files
- Chunk the content while respecting Markdown headers
- Generate embeddings using Cohere
- Store the vectors in Qdrant

### 5. Run the Application

```bash
# Run locally
uvicorn app.main:app --reload --port 8000

# Or with Docker
docker build -t rag-chatbot .
docker run -p 8000:8000 rag-chatbot
```

## API Endpoints

- `POST /chat` - Submit a question and receive an answer
- `GET /health` - Check the health status of the service
- `POST /feedback` - Submit feedback on an answer

## Frontend Integration

The chat widget is designed to be integrated into Docusaurus as a swizzled component. After building the React component, it can be injected into the Docusaurus layout to appear globally on every page.

## Testing

Run the test suite:

```bash
pytest tests/
```

## Deployment

The application is designed for deployment on platforms like Railway or Vercel using the provided Dockerfile.