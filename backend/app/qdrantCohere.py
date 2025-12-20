import requests
import xml.etree.ElementTree as ET
import trafilatura
from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance, PointStruct
import cohere
import os
# -------------------------------------
# CONFIG
# -------------------------------------
# Your Deployment Link:
SITEMAP_URL = "https://sameerkaleem.github.io/Physical-AI-And-Humanoid-Robotics-Claude-Code-CLI.github.io/sitemap.xml"
COLLECTION_NAME = "Physical-AI-And-Humanoid-Robotics"

cohere_client = cohere.Client(os.getenv("COHERE_API_KEY"))
EMBED_MODEL = "embed-english-v3.0"

# Connect to Qdrant Cloud
print("Connecting to Qdrant...")
qdrant = QdrantClient(
    url=os.getenv("QDRANT_URL"),
    api_key=os.getenv("QDRANT_API_KEY"),
)
print("Getting collections...")
collections = qdrant.get_collections()
print("Collections:", collections)

# -------------------------------------
# Step 1 — Extract URLs from sitemap
# -------------------------------------
def get_all_urls(sitemap_url):
    xml = requests.get(sitemap_url).text
    root = ET.fromstring(xml)

    urls = []
    for child in root:
        loc_tag = child.find("{http://www.sitemaps.org/schemas/sitemap/0.9}loc")
        if loc_tag is not None:
            urls.append(loc_tag.text)

    print("\nFOUND URLS:")
    for u in urls:
        print(" -", u)

    return urls


# -------------------------------------
# Step 2 — Download page + extract text
# -------------------------------------
def extract_text_from_url(url):
    try:
        html = requests.get(url, timeout=10).text
        text = trafilatura.extract(html)

        if not text:
            print("[WARNING] No text extracted from:", url)
            return None

        print(f"Extracted text length: {len(text)}")
        return text
    except requests.exceptions.RequestException as e:
        print(f"[ERROR] Failed to fetch {url}: {e}")
        return None


# -------------------------------------
# Step 3 — Chunk the text
# -------------------------------------
def chunk_text(text, max_chars=1200):
    chunks = []
    start = 0
    while start < len(text):
        end = min(start + max_chars, len(text))
        split_pos = text.rfind(". ", start, end)
        if split_pos != -1:
            chunks.append(text[start:split_pos + 2])
            start = split_pos + 2
        else:
            chunks.append(text[start:end])
            start = end
    return chunks


# -------------------------------------
# Step 4 — Create embedding
# -------------------------------------
def embed(text):
    try:
        response = cohere_client.embed(
            model=EMBED_MODEL,
            input_type="search_document",  # Use search_document for documents
            texts=[text],
        )
        return response.embeddings[0]  # Return the first embedding
    except Exception as e:
        print(f"Error embedding text: {e}")
        return None


# -------------------------------------
# Step 5 — Store in Qdrant
# -------------------------------------
def create_collection():
    print("\nCreating Qdrant collection...")
    qdrant.recreate_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(
        size=1024,        # Cohere embed-english-v3.0 dimension
        distance=Distance.COSINE
        )
    )

def save_chunk_to_qdrant(chunk, chunk_id, url):
    try:
        vector = embed(chunk)
        if vector is None:
            print(f"Skipping chunk {chunk_id} due to embedding error")
            return
        qdrant.upsert(
            collection_name=COLLECTION_NAME,
            points=[
                PointStruct(
                    id=chunk_id,
                    vector=vector,
                    payload={
                        "url": url,
                        "text": chunk,
                        "chunk_id": chunk_id
                    }
                )
            ]
        )
        print(f"Saved chunk {chunk_id}")
    except Exception as e:
        print(f"Error saving chunk {chunk_id}: {e}")


# -------------------------------------
# MAIN INGESTION PIPELINE
# -------------------------------------
def ingest_book():
    urls = get_all_urls(SITEMAP_URL)

    create_collection()

    global_id = 1

    for url in urls:
        print("\nProcessing:", url)
        text = extract_text_from_url(url)

        if not text:
            continue

        chunks = chunk_text(text)

        for ch in chunks:
            save_chunk_to_qdrant(ch, global_id, url)
            print(f"Saved chunk {global_id}")
            global_id += 1

    print("\n✔️ Ingestion completed!")
    print("Total chunks stored:", global_id - 1)


if __name__ == "__main__":
    ingest_book()

