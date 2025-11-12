from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
from django.conf import settings
from langchain.chat_models import ChatOpenAI
from langchain.pydantic_v1 import BaseModel, Field, validator
import pinecone
from langchain.vectorstores import Pinecone
from langchain.embeddings import OpenAIEmbeddings
from langchain.document_loaders import JSONLoader
import tiktoken
from langchain.text_splitter import RecursiveCharacterTextSplitter
from tqdm.auto import tqdm
from uuid import uuid4
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA, RetrievalQAWithSourcesChain
from langchain.schema.runnable import RunnablePassthrough
from langchain.vectorstores import Chroma
from chromadb.config import Settings

import chromadb
# from qdrant_client import QdrantClient
# from qdrant_client.http import models
# from qdrant_client.http.models import Distance, VectorParams
import time


# Initialize tiktoken for data encoding
tiktoken.encoding_for_model('gpt-3.5-turbo')
tokenizer = tiktoken.get_encoding('cl100k_base')


def tiktoken_len(text):
    tokens = tokenizer.encode(
        text,
        disallowed_special=()
    )
    return len(tokens)


# Use the Recursive text Chunker from Langchain to fragment the entire menu into smaller chunks
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=400,
    chunk_overlap=30,
    length_function=tiktoken_len,
    separators=["category"]
)

embeddings = OpenAIEmbeddings(
    model='text-embedding-ada-002', openai_api_key=settings.OPENAI_API_KEY)

hotels = ['degg', 'hocco', 'moes', 'pfchangs', 'sushima']

# Initialize Chroma client to point to the chromadb container
time.sleep(3)
client = chromadb.HttpClient(host="chromadb", port=8000)
print("Chroma DB ", client.heartbeat())


@api_view(["POST"])
def uploadData(request, *args, **kwrgs):
    print("Uploading data to VectorDB")
    for fileName in hotels:
        data = json.load(open('data/'+fileName+'.json'))
        print("Inserting Data to Chroma : ", fileName)
        texts = []
        metadatas = []
        metadata = {
            'hotelName': data['hotelName']
        }
        record_texts = []
        for cat in data['sections']:
            record_texts.append(json.dumps(cat))

        record_metadatas = [{
            "chunk": j, "text": text, **metadata
        } for j, text in enumerate(record_texts)]
        texts.extend(record_texts)
        metadatas.extend(record_metadatas)
        hotelCollection = client.create_collection(
            name=data['hotelName'], embedding_function=embeddings)
        if len(texts) > 0:
            ids = [str(uuid4()) for _ in range(len(texts))]
            embeds = embeddings.embed_documents(texts)
            # db = Chroma.from_documents(docs, embedding_function)
            hotelCollection.add(
                documents=texts,
                embeddings=embeds,
                ids=ids
            )
            print("Data upload completd for : ", fileName)
    return Response("Data Upload Complete")


@api_view(["POST"])
def getFullMenu(request, *args, **kwrgs):
    hotel = request.data['hotel']
    data = json.load(open('data/'+hotel+'.json'))
    items = []
    for category in data['sections']:
        for item in category["items"]:
            items.append(item)
    newData = {"items": items}
    return Response(newData)


@api_view(["POST"])
def uploadToChroma(request, *args, **kwrgs):
    fileName = request.data["hotel"]
    data = json.load(open('data/'+fileName+'.json'))
    print("Inserting Data to Chroma")
    texts = []
    metadatas = []
    metadata = {
        'hotelName': data['hotelName']
    }
    record_texts = []
    for cat in data['sections']:
        record_texts.append(json.dumps(cat))

    record_metadatas = [{
        "chunk": j, "text": text, **metadata
    } for j, text in enumerate(record_texts)]
    texts.extend(record_texts)
    metadatas.extend(record_metadatas)
    hotelCollection = client.create_collection(
        name=data['hotelName'], embedding_function=embeddings)
    if len(texts) > 0:
        ids = [str(uuid4()) for _ in range(len(texts))]
        embeds = embeddings.embed_documents(texts)
        hotelCollection.add(
            documents=texts,
            embeddings=embeds,
            ids=ids
        )

    return Response("Chroma Upload Complete")


@api_view(["POST"])
def filterData(request, *args, **kwrgs):
    query = request.data['data']
    hotel = request.data['hotel']
    hotelCollection = client.get_collection(name=hotel)
    llm = ChatOpenAI(
        openai_api_key=settings.OPENAI_API_KEY,
        model_name='gpt-4o-mini',
        temperature=0.0
    )
    print("Items on Collection ", hotelCollection.peek())
    print("Number of items : ", hotelCollection.count())
    db = Chroma(
        client=client,
        collection_name=hotel,
        embedding_function=embeddings,
    )
    query = query
    qa = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=db.as_retriever(search_type="mmr")
    )
    prompt = """
        You are an intelligent assistant helping users query restaurant menu information. Your task is to analyze the user's query
        and provide accurate responses based solely on the menu data provided in the context.

        REASONING STEPS:
        1. Understand the user's query and identify key requirements (e.g., dietary restrictions, price constraints, meal type)
        2. Search through the menu model to find items that match ALL specified criteria
        3. For filtering queries: Return all items matching the specified filters
        4. For factual queries: Extract specific information about mentioned items
        5. For suggestive queries: Recommend items based on stated preferences
        6. For arithmetic queries: Calculate totals and verify they meet price constraints
        7. For invalid/unrelated queries: Respond that the question is not related to the menu content

        EXAMPLES:

        Example 1 - Simple Filtering:
        Query: "List all vegetarian items"
        Reasoning: Search for items marked as vegetarian in the menu
        Response: { "items": [...] }

        Example 2 - Single-hop Reasoning:
        Query: "What are the desserts under $10?"
        Reasoning: Filter items in dessert category AND price < $10
        Response: { "items": [...] }

        Example 3 - Multi-hop Reasoning:
        Query: "What are the gluten-free appetizers with a drink under $20?"
        Reasoning: Filter appetizers that are gluten-free AND find drinks, then verify total < $20
        Response: { "items": [...] }

        Example 4 - Logical and Arithmetic:
        Query: "Find me a combination of a main dish and a dessert for less than $30, with the main dish being vegetarian"
        Reasoning: Find vegetarian main dishes, find desserts, calculate combinations where sum < $30
        Response: { "items": [...] }

        Example 5 - Suggestive:
        Query: "What's a good vegan meal with a drink for under $25?"
        Reasoning: Recommend vegan main course + drink where total < $25
        Response: { "items": [...] }

        Example 6 - Negative Query:
        Query: "Why is this restaurant so expensive?"
        Reasoning: Query is not about specific menu items or filtering
        Response: { "message": "I can only answer questions about menu items, prices, ingredients, and dietary information. Please ask about specific dishes or menu categories." }

        IMPORTANT RULES:
        - Base all responses STRICTLY on the provided menu model context
        - Do NOT hallucinate or invent information not present in the menu
        - For items far apart in the menu, carefully verify their relationships
        - For ambiguous queries, interpret based on most common meaning (e.g., "healthy" = low calorie or vegetarian)
        - Always return responses in valid JSON format

        OUTPUT FORMAT:
        For filtering/list queries, return:
        {
            "items": [
                {
                    "id": "",
                    "name": "",
                    "price": "",
                    "description": "",
                    "ingredients": [],
                    "calories": 0
                }
            ]
        }

        For factual queries (e.g., "What is the price of omelette?"), return:
        {
            "message": "The omelette costs $X.XX"
        }

        For invalid/unrelated queries, return:
        {
            "message": "I can only answer questions about menu items. Please ask about specific dishes or menu categories."
        }

        Now process the following query based on the menu context provided:
        """
    result = qa.run(prompt + "\n\nUser Query: " + query)
    return Response(json.loads(result))


@api_view(["POST"])
def deleteCollections(request, *args, **kwrgs):
    hotelName = request.data['hotelName']
    if hotelName == 'all':
        for hotel in hotels:
            client.delete_collection(name=hotel)
        return Response("All Hotel Collections have been deleted")
    else:
        client.delete_collection(name=hotelName)
        return Response("Hotel Collection deleted : " + hotelName)
