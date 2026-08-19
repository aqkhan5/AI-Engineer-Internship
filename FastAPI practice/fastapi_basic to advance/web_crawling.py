# # Automatically extracting the data from the external websites and displaying it.

# import requests
# # from fastapi import FastAPI, HTTPException
# from bs4 import BeautifulSoup

# url = "https://example.com"

# response = requests.get(url)

# soup = BeautifulSoup(requests.text, "html.parser")
# print(soup.title.text)


from fastapi import FastAPI, HTTPException
import requests
from bs4 import BeautifulSoup

app = FastAPI()

@app.get("/news")
def get_news():
    url = "https://www.bbc.com/urdu"
    
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    title = []

    for item in soup.find_all("a", class_="css-1i4ie53 eq53xv90"):
        title.append(item.text)

    return{
        "News" : title[:5]
    }
