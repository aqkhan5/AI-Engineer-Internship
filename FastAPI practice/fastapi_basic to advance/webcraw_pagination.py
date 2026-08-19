# web crawling and pagination practice

from fastapi import FastAPI
from bs4 import BeautifulSoup
import requests

app = FastAPI()

@app.get("/Insignts")
def get_insight(page: int = 1, limit: int = 5):

    url = "https://news.sky.com/"
    response = requests.get(url)

    soup = BeautifulSoup(response.text, "html.parser")
    title = []

    for item in soup.find_all("a", class_="px-2 py-2 block whitespace-nowrap hover:bg-gray-200 uppercase leading-4 text-2.75    "):
        title.append(item.text)

# Pagination Logic
    start = (page-1) * limit
    end = start+limit

    return {
        "page" : page,
        "limit" : limit,
        "total" : len(title),
        "data": title[start:end]
    }