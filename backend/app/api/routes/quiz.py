from fastapi import APIRouter
from app.config import vector_store_define
from app.data.models.Quiz import QuizRequest
from app.services.quizGenerate import generate_quiz

router = APIRouter()

@router.post("/generateQuiz")
async def get_quiz(quiz_request: QuizRequest):

    vector_store = vector_store_define()

    retrieved_docs = vector_store.similarity_search(
        "what are the main facts ?", 
        k=quiz_request.no_of_questions + 3,
        filter={"filename": quiz_request.file_name}
    )

    chunks = [doc.page_content for doc in retrieved_docs] # extract text content from Langchain Document format that accepts from generate_quiz

    quiz = generate_quiz(chunks, no_of_questions=quiz_request.no_of_questions)

    return quiz