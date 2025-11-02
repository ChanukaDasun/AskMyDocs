from fastapi import APIRouter
from app.config import vector_store_define, get_chat_model
from app.data.models.Quiz import QuizRequest
from app.data.models.Answer import AnswerRequest
from app.services.quizGenerate import generate_quiz
from app.services.answering import generate_answer

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

@router.post("/askQuestions")
async def ask_question(answer_request: AnswerRequest):

    response = generate_answer(answer_request.question, answer_request.file_name)
    return response