from fastapi import File, UploadFile, APIRouter
from PyPDF2 import PdfReader
import shutil
from io import BytesIO
import os
from app.config import UPLOAD_DIR
from app.services.chunking import chunk_text
from app.config import vector_store_define
from langchain_core.documents import Document

router = APIRouter()

os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    content = await file.read()
    pdf = PdfReader(BytesIO(content))
    text = "\n".join(page.extract_text() for page in pdf.pages)

    chunks = chunk_text(text) # return as plain text chunks

    docs = [Document(page_content=chunk, metadata={"filename": file.filename}) for chunk in chunks] # convert to Langchain Document format and store metadata as filename

    vector_store = vector_store_define()

    # store vector embeddings on the vector database
    vector_store.add_documents(docs)

    return {"filename": file.filename, "len_chunks": len(chunks)}