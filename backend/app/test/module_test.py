from app.config import get_chat_model

chat_model = get_chat_model()
print(chat_model.invoke("what is your name?").content)