from app.config import get_chat_model
import json
import re


def generate_quiz(all_chunks, no_of_questions=10):

  json_format = {
      "question": "string",
      "correct_answer": "string",
      "answers": ["string", "string", "string", "string"]
  }

  query = f"""
    You are an assistant that generates meaningful and diverse questions. considering below facts generate f{no_of_questions} distinct questions.

      1.	understand the context that you are provided
      2.	using your knowledge identify main facts about the context/document not specific to this provided context.
      3.	filter context using this question "as if there is an exam what will be the most likely to come for the exam from this content?".
      4.	using this filtered documents generate relatable questions that given format

    Your each question,
    answers pair must be in this f{json_format} format. here you must include the 'correct_answer'
    for each question into each 'answers' array. remember when you make this 'answers' make sure to add 3 incorrect
    answers and exactly same 'correct_answer' that you generate for each question. also the 'answers' attribute
    must be shuffled (make it random). this is how the 'answers' attribute look like -> 'answers' = incorrect 3 answers + correct answer
    Document context: f{all_chunks}
  """

  llm = get_chat_model()

  raw_response = llm.invoke(query)
  clean_response = re.sub(r"```json|```", "", raw_response.content).strip()
  json_response = json.loads(clean_response)
  return json_response
