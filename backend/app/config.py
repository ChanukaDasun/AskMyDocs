from langchain_google_genai import ChatGoogleGenerativeAI
# from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.chat_models import init_chat_model
from langchain_chroma import Chroma
from dotenv import load_dotenv 
from pathlib import Path
import os

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

UPLOAD_DIR = Path(__file__).resolve().parent / "data" / "uploads"

VECTORS_DIR = Path(__file__).resolve().parent / "data" / "vectors"

def get_chat_model():
    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.7, google_api_key=GOOGLE_API_KEY)
    return llm

def embedding_model():
    # embedding model
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    return embeddings

def vector_store_define():
    vector_store = Chroma(
        collection_name="rag_collection",
        embedding_function=embedding_model(),
        persist_directory=VECTORS_DIR,
    )
    return vector_store