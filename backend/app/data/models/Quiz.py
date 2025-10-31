from pydantic import BaseModel

class QuizRequest(BaseModel):
    no_of_questions: int = 10
    file_name: str