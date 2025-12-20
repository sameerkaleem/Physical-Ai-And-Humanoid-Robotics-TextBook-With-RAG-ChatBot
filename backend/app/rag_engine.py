import os
import cohere
from qdrant_client import QdrantClient
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv
from .database import db_manager
import logging

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class RAGEngine:
    def __init__(self):
        # Initialize Cohere client
        cohere_api_key = os.getenv("COHERE_API_KEY")
        if not cohere_api_key:
            raise ValueError("COHERE_API_KEY environment variable is not set")
        self.cohere_client = cohere.Client(cohere_api_key)

        # Initialize Qdrant client
        qdrant_url = os.getenv("QDRANT_URL")
        qdrant_api_key = os.getenv("QDRANT_API_KEY")
        if not qdrant_url or not qdrant_api_key:
            raise ValueError("QDRANT_URL or QDRANT_API_KEY environment variable is not set")

        self.qdrant_client = QdrantClient(
            url=qdrant_url,
            api_key=qdrant_api_key,
            timeout=3  # 3 second timeout for Qdrant operations
        )

    def embed_query(self, query: str) -> List[float]:
        """Generate embedding for the user query"""
        try:
            response = self.cohere_client.embed(
                texts=[query],
                model="embed-english-v3.0",
                input_type="search_query"
            )
            return response.embeddings[0]
        except Exception as e:
            logger.error(f"Error generating embedding for query: {e}")
            raise

    def query_qdrant(self, query_embedding: List[float], top_k: int = 3) -> List[Dict[str, Any]]:
        """Query Qdrant for similar text chunks"""
        try:
            search_results = self.qdrant_client.query_points(
                collection_name="Physical-AI-And-Humanoid-Robotics",
                query=query_embedding,
                limit=top_k,
                with_payload=True,
                timeout=3  # 3 second timeout for individual search operation
            )

            results = []
            # For query_points, the results are in search_results.points
            for result in search_results.points:
                results.append({
                    'content': result.payload.get('text', ''),
                    'source_file': result.payload.get('url', ''),
                    'section_title': '',
                    'filename': result.payload.get('url', '').split('/')[-1],
                    'score': result.score
                })

            logger.info(f"Found {len(results)} relevant chunks from Qdrant")
            return results
        except Exception as e:
            logger.error(f"Error querying Qdrant: {e}")
            raise

    async def fetch_conversation_memory(self, session_id: str, limit: int = 3) -> List[Dict[str, str]]:
        """Fetch last N messages from Neon DB for conversational context"""
        try:
            recent_messages = await db_manager.get_recent_messages(session_id, limit)
            logger.info(f"Fetched {len(recent_messages)} recent messages for session {session_id}")
            return recent_messages
        except Exception as e:
            logger.error(f"Error fetching conversation memory: {e}")
            return []  # Return empty list if there's an error

    def construct_prompt(self, query: str, context_chunks: List[Dict[str, Any]], conversation_history: List[Dict[str, str]]) -> str:
        """Construct the final prompt for Cohere command-r"""
        # Start with the system context
        prompt_parts = [
            "You are an AI assistant for the 'Physical AI & Humanoid Robotics' textbook. ",
            "Answer questions based on the provided textbook content. ",
            "Be concise, accurate, and reference the textbook material when possible.\n\n"
        ]

        # Add conversation history if available
        if conversation_history:
            prompt_parts.append("Previous conversation:\n")
            for msg in conversation_history:
                prompt_parts.append(f"User: {msg['user_query']}\n")
                prompt_parts.append(f"Assistant: {msg['ai_response']}\n")
            prompt_parts.append("\n")

        # Add relevant context from textbook
        if context_chunks:
            prompt_parts.append("Relevant textbook content:\n")
            for i, chunk in enumerate(context_chunks, 1):
                prompt_parts.append(f"Source: {chunk['source_file']} - {chunk['section_title']}\n")
                prompt_parts.append(f"Content: {chunk['content']}\n\n")
        else:
            prompt_parts.append("No relevant textbook content found for this query.\n\n")

        # Add the actual user query
        prompt_parts.append(f"Question: {query}\n")
        prompt_parts.append("Answer:")

        return "".join(prompt_parts)

    def generate_response(self, prompt: str) -> str:
        """Generate response using Cohere command-r-plus chat API"""
        try:
            response = self.cohere_client.chat(
                model="command-r-plus-08-2024",  # Using a currently available model
                message=prompt,
                max_tokens=500,
                temperature=0.3
            )
            return response.text.strip()
        except Exception as e:
            logger.error(f"Error generating response: {e}")
            return "I encountered an error while generating a response. Please try again."

    async def process_query(self, query: str, session_id: str, selection_context: Optional[str] = None) -> Dict[str, Any]:
        """Main method to process a user query through the RAG pipeline"""
        logger.info(f"Processing query for session {session_id}")

        # Use selection context if provided, otherwise use the query
        search_text = selection_context if selection_context else query

        # Generate embedding for the query
        query_embedding = self.embed_query(search_text)

        # Query Qdrant for relevant chunks
        context_chunks = self.query_qdrant(query_embedding)

        # Fetch conversation history
        conversation_history = await self.fetch_conversation_memory(session_id)

        # Construct the prompt
        prompt = self.construct_prompt(query, context_chunks, conversation_history)

        # Generate the response
        response = self.generate_response(prompt)

        # Extract sources from context chunks
        sources = [chunk['source_file'] for chunk in context_chunks if chunk['source_file']]

        # Return the response and metadata
        return {
            'answer': response,
            'sources': sources,
            'session_id': session_id
        }

# Global RAG engine instance
rag_engine = RAGEngine()