from app.config import vector_store_define, get_chat_model

def generate_answer(question: str, file_name: str):
    """
    Generate an answer to the given question using context retrieved 
    from the vector store and an LLM model.
    """

    vector_store = vector_store_define()

    context_docs = vector_store.similarity_search(
        question,
        k=10,
        filter={"filename": file_name}
    )

    context_text = "\n\n".join([doc.page_content for doc in context_docs])

    llm = get_chat_model()

    query = f"""
    You are an intelligent assistant helping users find answers based on provided document context.
    Use only the information in the context to answer the question.
    If the answer cannot be found in the context, respond with: 
    "I'm sorry, I could not find the relevant information in the provided documents."

    ### Context:
    {context_text}

    ### Question:
    {question}

    ### Answer:
    """

    # Step 5: Generate the answer using the LLM
    response = llm.invoke(query)
    answer = response.content if hasattr(response, 'content') else str(response)

    return answer
