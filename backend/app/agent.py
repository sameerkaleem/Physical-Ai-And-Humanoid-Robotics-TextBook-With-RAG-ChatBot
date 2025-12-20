import os
from agents import Agent, Runner, OpenAIChatCompletionsModel, AsyncOpenAI, set_tracing_disabled, function_tool, enable_verbose_stdout_logging
from dotenv import load_dotenv 
import cohere
from qdrant_client import QdrantClient

enable_verbose_stdout_logging()
load_dotenv()
set_tracing_disabled(disabled=True)

gemini_api_key = os.getenv("GEMINI_API_KEY")
provider = AsyncOpenAI(
    api_key=gemini_api_key,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

model = OpenAIChatCompletionsModel(
    model="gemini-2.5-flash",
    openai_client=provider
)

# Initialize Cohere client
cohere_client = cohere.Client(os.getenv("COHERE_API_KEY"))

# Connect to Qdrant
qdrant = QdrantClient(
    url=os.getenv("QDRANT_URL"), 
    api_key=os.getenv("QDRANT_API_KEY"),
)

def get_embedding(text):
    """Get embedding vector from Cohere Embed v3"""
    response = cohere_client.embed(
        model="embed-english-v3.0",
        input_type="search_query",  # Use search_query for queries
        texts=[text],
    )
    return response.embeddings[0]  # Return the first embedding

@function_tool
def retrieve(query):
    embedding = get_embedding(query)
    result = qdrant.query_points(
        collection_name="Physical-AI-And-Humanoid-Robotics",
        query=embedding,
        limit=5
    )
    return [point.payload["text"] for point in result.points]

agent = Agent(
    name="Assistant",
    instructions="""
You are an AI tutor for the Physical AI & Humanoid Robotics textbook.
To answer the user question, first call the tool `retrieve` with the user query.
Use ONLY the returned content from `retrieve` to answer.
If the answer is not in the retrieved content, say "I don't know".
""",
    model=model,
    tools=[retrieve]
)


result = Runner.run_sync(
    agent,
    input="what are control loops?",
)

print(result.final_output)