from fastapi.testclient import TestClient
from test_fastapi import app

client = TestClient(app)

def test_home():
    response = client.get("/")
    # status code check
    assert response.status_code == 200
    assert response.json() == { "message" : "Hello Mohit"}

def test_add():
    response = client.get("/add?a=5&b=3")
    assert response.status_code == 200
    assert response.json() == {"result: 15"}