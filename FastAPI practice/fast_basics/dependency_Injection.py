from fastapi import FastAPI, Depends, Header, HTTPException

app = FastAPI()

def common_logic():
    return{
        "message" : "Common logic"
    }

@app.get("/home")
def home(data = Depends(common_logic)):
    return data

# Reuse logic
def current_user():
    return{
        "name" : "Mohsin"
    }

@app.get("/profile")
def profile(user = Depends(current_user)):
    return user

@app.get("/dashboard")
def dashboard(user = Depends(current_user)):
    return user


# Auth example
def verify_token(token: str=Header(None)):
    if token != "my secret token":
        raise HTTPException(
            status_code=401,
            detail="Unauthorized"
        )
    return{
        "user" : "Authorized User"
    }

@app.get("/secret_data")
def secret_data(user = Depends(verify_token)):
    return {
        "message" : "Secure data access",
        "user" : user
    }

