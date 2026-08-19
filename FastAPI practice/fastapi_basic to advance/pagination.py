# Pigination is handling large data in easiest way. for example you have 100000 record, loading all at one will create a problem but loading them in a 5 5 pairs will run the functions smoothly. Pagination mean dividing in to pages.

from fastapi import FastAPI, HTTPException
import requests
from bs4 import BeautifulSoup

app = FastAPI()

@app.get("/news")
def get_news(page: int = 1, limit: int = 5):

    url = "https://news.ycombinator.com/"
    
    response = requests.get(url)

    soup = BeautifulSoup(response.text, "html.parser")

    title = []

    for item in soup.find_all("span", class_="titleline"):
        title.append(item.text)

    # Pagination Logic
    start = (page-1)* limit
    end = start + limit    

    return{
        "page" : page,
        "limit" : limit,
        "total" : len(title),
        "data" : title[start:end]
    }