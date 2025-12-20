# Data Model: RAG Chatbot for Physical AI & Humanoid Robotics Textbook

## Entities

### Question
- **id**: string (UUID) - Unique identifier for the question
- **session_id**: string (UUID) - References the chat session
- **content**: string - The actual question text from the user
- **timestamp**: datetime - When the question was asked
- **selection_context**: string (optional) - Text that was highlighted when the question was asked

### Answer
- **id**: string (UUID) - Unique identifier for the answer
- **question_id**: string (UUID) - References the associated question
- **content**: string - The AI-generated response
- **sources**: array of strings - References to the textbook chunks used to generate the answer
- **timestamp**: datetime - When the answer was generated
- **confidence**: number (0-1) - Confidence score of the response

### Chat Session
- **id**: string (UUID) - Unique identifier for the session
- **created_at**: datetime - When the session was started
- **last_interaction**: datetime - When the last question/answer occurred
- **user_id**: string (optional) - Identifier for the user (if available)

### Textbook Chunk (Vector Database)
- **id**: string (UUID) - Unique identifier for the chunk
- **content**: string - The text content of the chunk
- **embedding**: array of numbers (1024 dimensions) - Vector representation of the content
- **metadata**: object
  - **source_file**: string - Path to the original markdown file
  - **section_title**: string - Title of the section from the markdown
  - **page_reference**: string - Reference to the original page/section
  - **created_at**: datetime - When this chunk was created

## Relationships

- Chat Session (1) → (0..n) Question: A session can have multiple questions
- Question (1) → (1) Answer: Each question has exactly one answer
- Answer (0..n) → (0..n) Textbook Chunk: Answers reference multiple chunks for context

## Validation Rules

- Question content must be between 5 and 1000 characters
- Session must be active (last_interaction within 24 hours) to continue
- Textbook chunks must not exceed 2000 characters to maintain context
- Embeddings must be exactly 1024 dimensions for Cohere compatibility

## State Transitions

- Chat Session: Active → Inactive (after 24 hours of inactivity)
- Question: Pending → Processing → Answered (or Failed if error occurs)