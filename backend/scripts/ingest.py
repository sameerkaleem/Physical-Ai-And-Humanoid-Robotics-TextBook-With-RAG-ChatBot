import os
import re
from typing import List, Dict, Any
import cohere
from qdrant_client import QdrantClient
from qdrant_client.http import models
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def parse_docs(docs_dir: str = "docs") -> List[Dict[str, Any]]:
    """
    Recursively find all .md files in the docs/ folder and parse their content
    """
    md_files = []

    for root, dirs, files in os.walk(docs_dir):
        for file in files:
            if file.endswith('.md') or file.endswith('.mdx'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    md_files.append({
                        'path': file_path,
                        'content': content,
                        'filename': file
                    })

    return md_files

def chunk_text(content: str, max_chunk_size: int = 1500) -> List[Dict[str, Any]]:
    """
    Split text by H2/H3 headers to maintain semantic context
    """
    # Split content by headers (H1, H2, H3)
    header_pattern = r'(^|\n)(#{1,3})\s+(.+?)(\n|$)'
    header_matches = list(re.finditer(header_pattern, content, re.MULTILINE))

    chunks = []
    start = 0

    for match in header_matches:
        # Get the content from the previous header to this one
        chunk_start = match.start()
        chunk_content = content[start:chunk_start].strip()

        # If we have content before this header, create a chunk
        if chunk_content and len(chunk_content.strip()) > 0:
            # Get the section title from the previous header
            title_match = re.search(r'(#{1,3})\s+(.+?)(\n|$)', content[max(0, start-50):chunk_start])
            section_title = title_match.group(2).strip() if title_match else "Untitled Section"

            chunks.append({
                'content': chunk_content,
                'section_title': section_title,
                'start_pos': start,
                'end_pos': chunk_start
            })

        # Move start to after this header
        start = match.end()

    # Add the final chunk if there's remaining content
    if start < len(content):
        remaining_content = content[start:].strip()
        if remaining_content:
            # Find the nearest header to use as the title
            title_match = re.search(r'(#{1,3})\s+(.+?)(\n|$)', content[start:start+200])
            section_title = title_match.group(2).strip() if title_match else "Untitled Section"

            chunks.append({
                'content': remaining_content,
                'section_title': section_title,
                'start_pos': start,
                'end_pos': len(content)
            })

    # Further split large chunks if needed
    final_chunks = []
    for chunk in chunks:
        if len(chunk['content']) > max_chunk_size:
            # Split large chunk into smaller ones
            sub_chunks = split_large_chunk(chunk['content'], max_chunk_size)
            for i, sub_chunk in enumerate(sub_chunks):
                final_chunks.append({
                    'content': sub_chunk,
                    'section_title': f"{chunk['section_title']} (Part {i+1})",
                    'start_pos': chunk['start_pos'],
                    'end_pos': chunk['end_pos']
                })
        else:
            final_chunks.append(chunk)

    return final_chunks

def split_large_chunk(content: str, max_size: int) -> List[str]:
    """
    Split a large chunk into smaller ones while trying to maintain sentence boundaries
    """
    sentences = re.split(r'(?<=[.!?])\s+', content)
    chunks = []
    current_chunk = ""

    for sentence in sentences:
        if len(current_chunk) + len(sentence) <= max_size:
            current_chunk += sentence + " "
        else:
            if current_chunk.strip():
                chunks.append(current_chunk.strip())
            current_chunk = sentence + " "

    if current_chunk.strip():
        chunks.append(current_chunk.strip())

    return chunks

def embed_and_index(docs: List[Dict[str, Any]], cohere_api_key: str, qdrant_url: str, qdrant_api_key: str):
    """
    Generate embeddings using Cohere and upsert to Qdrant
    """
    # Initialize Cohere client
    co = cohere.Client(os.getenv("COHERE_API_KEY"))

    # Initialize Qdrant client
    qdrant_client = QdrantClient(
        url=os.getenv("QDRANT_URL"),
        api_key=os.getenv("QDRANT_API_KEY"),
        timeout=3
    )

    # Create collection if it doesn't exist
    try:
        qdrant_client.get_collection("textbook_chunks")
        print("Collection 'textbook_chunks' already exists")
    except:
        print("Creating collection 'textbook_chunks'...")
        qdrant_client.create_collection(
            collection_name="textbook_chunks",
            vectors_config=models.VectorParams(size=1024, distance=models.Distance.COSINE),
        )

    # Process documents and create embeddings
    points = []
    point_id = 0

    for doc in docs:
        chunks = chunk_text(doc['content'])

        for chunk in chunks:
            # Generate embedding using Cohere
            response = co.embed(
                texts=[chunk['content']],
                model="embed-english-v3.0",
                input_type="search_document"
            )

            embedding = response.embeddings[0]

            # Create a Qdrant point
            point = models.PointStruct(
                id=point_id,
                vector=embedding,
                payload={
                    "content": chunk['content'],
                    "source_file": doc['path'],
                    "section_title": chunk['section_title'],
                    "filename": doc['filename']
                }
            )

            points.append(point)
            point_id += 1

            if len(points) >= 100:  # Batch upload every 100 points
                print(f"Uploading batch of {len(points)} points to Qdrant...")
                qdrant_client.upsert(
                    collection_name="textbook_chunks",
                    points=points
                )
                points = []  # Reset for next batch

    # Upload remaining points
    if points:
        print(f"Uploading final batch of {len(points)} points to Qdrant...")
        qdrant_client.upsert(
            collection_name="textbook_chunks",
            points=points
        )

    print(f"Successfully indexed {point_id} text chunks into Qdrant collection 'textbook_chunks'")

def main():
    """
    Main function to run the ingestion pipeline
    """
    print("Starting ingestion pipeline...")

    # Load environment variables
    cohere_api_key = os.getenv("COHERE_API_KEY")
    qdrant_url = os.getenv("QDRANT_URL")
    qdrant_api_key = os.getenv("QDRANT_API_KEY")

    if not all([cohere_api_key, qdrant_url, qdrant_api_key]):
        print("Error: Missing required environment variables")
        return

    # Parse documents
    print("Parsing documents from docs/ directory...")
    docs = parse_docs()
    print(f"Found {len(docs)} markdown documents")

    # Process and index documents
    print("Processing documents and generating embeddings...")
    embed_and_index(docs, cohere_api_key, qdrant_url, qdrant_api_key)

    print("Ingestion pipeline completed successfully!")

if __name__ == "__main__":
    main()