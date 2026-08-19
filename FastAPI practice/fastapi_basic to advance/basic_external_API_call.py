import json
from urllib.request import urlopen

response = urlopen("https://jsonplaceholder.typicode.com/posts")

data = json.load(response)

print(data[:2])