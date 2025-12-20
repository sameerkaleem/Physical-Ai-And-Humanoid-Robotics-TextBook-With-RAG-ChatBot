import asyncpg
import os
from typing import Optional
from dotenv import load_dotenv
import logging

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class DatabaseManager:
    def __init__(self):
        self.pool: Optional[asyncpg.Pool] = None
        self.connection_url = os.getenv("NEON_DB_URL")

        if not self.connection_url:
            raise ValueError("NEON_DB_URL environment variable is not set")

    async def create_pool(self):
        """Create a connection pool to Neon Postgres"""
        try:
            self.pool = await asyncpg.create_pool(
                dsn=self.connection_url,
                min_size=1,
                max_size=10,
                command_timeout=60,
            )
            logger.info("Database connection pool created successfully")
        except Exception as e:
            logger.error(f"Failed to create database connection pool: {e}")
            raise

    async def close_pool(self):
        """Close the connection pool"""
        if self.pool:
            await self.pool.close()
            logger.info("Database connection pool closed")

    async def ensure_chat_history_table(self):
        """Create chat_history table if it doesn't exist"""
        if not self.pool:
            raise RuntimeError("Database pool not initialized")

        async with self.pool.acquire() as conn:
            # Create the chat_history table if it doesn't exist
            create_table_query = """
            CREATE TABLE IF NOT EXISTS chat_history (
                id SERIAL PRIMARY KEY,
                session_id VARCHAR(255) NOT NULL,
                user_query TEXT NOT NULL,
                ai_response TEXT NOT NULL,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            """

            await conn.execute(create_table_query)
            logger.info("Ensured chat_history table exists")

            # Create indexes separately for PostgreSQL
            await conn.execute("CREATE INDEX IF NOT EXISTS idx_session_id ON chat_history (session_id);")
            await conn.execute("CREATE INDEX IF NOT EXISTS idx_timestamp ON chat_history (timestamp);")
            logger.info("Ensured indexes exist")

    async def insert_chat_record(self, session_id: str, user_query: str, ai_response: str):
        """Insert a chat record into the database"""
        if not self.pool:
            raise RuntimeError("Database pool not initialized")

        async with self.pool.acquire() as conn:
            query = """
            INSERT INTO chat_history (session_id, user_query, ai_response)
            VALUES ($1, $2, $3)
            RETURNING id;
            """

            record_id = await conn.fetchval(query, session_id, user_query, ai_response)
            logger.info(f"Inserted chat record with ID: {record_id}")
            return record_id

    async def get_recent_messages(self, session_id: str, limit: int = 3):
        """Get the most recent messages for a session"""
        if not self.pool:
            raise RuntimeError("Database pool not initialized")

        async with self.pool.acquire() as conn:
            query = """
            SELECT user_query, ai_response, timestamp
            FROM chat_history
            WHERE session_id = $1
            ORDER BY timestamp DESC
            LIMIT $2;
            """

            rows = await conn.fetch(query, session_id, limit)
            messages = []
            for row in rows:
                messages.append({
                    'user_query': row['user_query'],
                    'ai_response': row['ai_response'],
                    'timestamp': row['timestamp']
                })

            # Reverse to get chronological order (oldest first)
            return messages[::-1]

# Global database manager instance
db_manager = DatabaseManager()

async def init_db():
    """Initialize the database connection and ensure tables exist"""
    await db_manager.create_pool()
    await db_manager.ensure_chat_history_table()

async def close_db():
    """Close the database connection"""
    await db_manager.close_pool()