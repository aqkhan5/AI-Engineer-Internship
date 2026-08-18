# =====================================================================
# 1. Imports
# =====================================================================
# FastAPI: Core framework for creating web APIs
# HTTPException: Used to raise HTTP errors (like 401 Unauthorized) to the client
# Depends: FastAPI's dependency injection system used to protect routes
# Header: Extracts parameter values directly from HTTP request headers
from fastapi import FastAPI, HTTPException, Depends, Header

# datetime: Used to get current time and handle timestamps
# timedelta: Used to add duration (e.g., +30 minutes) for token expiration
# timezone: Ensures we work with standard UTC timestamps
from datetime import datetime, timedelta, timezone

# python-jose: Library used to encode (create) and decode (verify) JWT tokens
from jose import jwt, JWTError

# =====================================================================
# 2. FastAPI Application Instance
# =====================================================================
app = FastAPI()

# =====================================================================
# 3. JWT Configuration Constants
# =====================================================================
# Secret key used to sign and verify tokens (keep this private & secure in production!)
SECRET_KEY = "my secret"

# Cryptographic algorithm used to sign the token (HS256 = HMAC with SHA-256)
ALGORITHM = "HS256"

# =====================================================================
# 4. JWT Helper Functions
# =====================================================================
def create_token(data: dict):
    """
    Creates a new signed JWT token with an expiration timestamp.
    
    :param data: Dictionary containing the payload/claims (e.g., {"user": "admin"})
    :return: Encoded JWT string
    """
    # 1. Make a copy of the input dictionary so the original data remains unchanged
    to_encode = data.copy()
    
    # 2. Calculate expiration time: Current UTC time + 30 minutes
    expire = datetime.now(timezone.utc) + timedelta(minutes=30)
    
    # 3. Add the 'exp' (expiration) claim to the token payload
    to_encode.update({
        "exp": expire
    })
    
    # 4. Encode and sign the payload with SECRET_KEY using the chosen ALGORITHM
    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    # 5. Return the signed JWT token
    return token


def verify_token(token: str = Header(None)):
    """
    Dependency function to extract and verify the JWT token from request headers.
    
    :param token: The token value extracted from the 'token' HTTP request header
    :return: The decoded payload dictionary if valid
    :raises HTTPException: 401 status if token is missing, invalid, or expired
    """
    # Check if the token header was provided in the request
    if token is None:
        raise HTTPException(
            status_code=401,
            detail="Token header is missing"
        )
    
    try:
        # Decode and verify the token signature and expiration
        # Note: algorithms expects a list (e.g., [ALGORITHM])
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        # If token is expired, corrupted, or signature does not match
        raise HTTPException(
            status_code=401, 
            detail="Invalid or expired Token"
        )

# =====================================================================
# 5. API Endpoints
# =====================================================================

# --- Login Route (Generates and returns a JWT) ---
@app.post("/login")
def login(username: str, password: str):
    """
    Simulates user login. If credentials match, generates and returns a JWT token.
    """
    # Validate user credentials (hardcoded example for demonstration)
    if username != "admin" or password != "1234":
        raise HTTPException(
            status_code=401,
            detail="Invalid Username or password"
        )
    
    # Create a JWT token containing the username in the payload
    token = create_token({
        "User": username
    })
    
    # Return the token to the client
    return {
        "access_token": token
    }


# --- Protected Route (Requires a valid JWT token) ---
@app.get("/secure")
def secure_data(user: dict = Depends(verify_token)):
    """
    Protected endpoint. FastAPI automatically executes `verify_token` first.
    If valid, the decoded user payload is passed to the `user` parameter.
    """
    return {
        "message": "secure data access",
        "User": user
    }
