# Automatically extracting the data from the external websites and displaying it.

import requests
# from fastapi import FastAPI, HTTPException
from bs4 import BeautifulSoup

url = "https://example.com"

response = requests.get(url)

soup = BeautifulSoup(requests.text, "html.parse")
print(soup.title.text)
