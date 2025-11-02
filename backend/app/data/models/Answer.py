from pydantic import BaseModel

class AnswerRequest(BaseModel):
    question: str
    file_name: str