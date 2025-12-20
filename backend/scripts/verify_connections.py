import asyncio
import asyncpg
import cohere
from qdrant_client import QdrantClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

async def test_neon_connection():
    """Test Neon Postgres connection"""
    try:
        connection_url = os.getenv("NEON_DB_URL")
        if not connection_url:
            print("❌ NEON_DB_URL not found in environment")
            return False

        conn = await asyncpg.connect(dsn=connection_url)
        version = await conn.fetchval("SELECT version();")
        print(f"✅ Neon connection successful. Server version: {version}")
        await conn.close()
        return True
    except Exception as e:
        print(f"❌ Neon connection failed: {str(e)}")
        return False

def test_cohere_connection():
    """Test Cohere API connection"""
    try:
        cohere_api_key = os.getenv("COHERE_API_KEY")
        if not cohere_api_key:
            print("❌ COHERE_API_KEY not found in environment")
            return False

        co = cohere.Client(os.getenv("COHERE_API_KEY"))
        # Test with a simple tokenize call
        response = co.tokenize(
            text="This is a test for Cohere API connection."
        )
        print(f"✅ Cohere connection successful. Tokens count: {len(response.tokens)}")
        return True
    except Exception as e:
        print(f"❌ Cohere connection failed: {str(e)}")
        return False

def test_qdrant_connection():
    """Test Qdrant connection"""
    try:
        qdrant_url = os.getenv("QDRANT_URL")
        qdrant_api_key = os.getenv("QDRANT_API_KEY")

        if not qdrant_url or not qdrant_api_key:
            print("❌ QDRANT_URL or QDRANT_API_KEY not found in environment")
            return False

        client = QdrantClient(
            url=os.getenv("QDRANT_URL"),
            api_key=os.getenv("QDRANT_API_KEY"),
            timeout=10
        )

        # Test by listing collections
        collections = client.get_collections()
        print(f"✅ Qdrant connection successful. Collections: {len(collections.collections)}")
        return True
    except Exception as e:
        print(f"❌ Qdrant connection failed: {str(e)}")
        return False

async def main():
    print("Testing connections to external services...")
    print("=" * 50)

    # Test all connections
    neon_ok = await test_neon_connection()
    cohere_ok = test_cohere_connection()
    qdrant_ok = test_qdrant_connection()

    print("=" * 50)
    if neon_ok and cohere_ok and qdrant_ok:
        print("🎉 All connections successful!")
        return True
    else:
        print("❌ Some connections failed!")
        return False

if __name__ == "__main__":
    success = asyncio.run(main())
    exit(0 if success else 1)