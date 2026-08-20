# ==============================================================================
# RATE LIMITING IN FASTAPI (Using SlowAPI)
# ==============================================================================
# Rate limiting protects your API from excessive/unnecessary requests, abuse, and spam.
# It sets a threshold on how many times a client/user can call an endpoint within a given time window.
#
# Prerequisite Installation:
#   pip install slowapi
# ==============================================================================

# 1. IMPORTS
# ------------------------------------------------------------------------------
# FastAPI: The core framework used to build web APIs.
# Request: Represents incoming HTTP requests. slowapi requires the 'request' object
#          to identify the client (e.g., via IP address).
from fastapi import FastAPI, Request

# Limiter: The main class from slowapi used to define and manage rate limits.
from slowapi import Limiter

# get_remote_address: A helper function that extracts the client's IP address from the request.
from slowapi.util import get_remote_address

# RateLimitExceeded: An exception raised automatically by slowapi when a client exceeds their quota.
from slowapi.errors import RateLimitExceeded

# JSONResponse: Used to return custom JSON responses with specific HTTP status codes (like 429).
from fastapi.responses import JSONResponse


# 2. APPLICATION INITIALIZATION
# ------------------------------------------------------------------------------
# Create the FastAPI application instance.
app = FastAPI()


# 3. RATE LIMITER CONFIGURATION
# ------------------------------------------------------------------------------
# Initialize the Limiter:
# - `key_func=get_remote_address`: Tells the limiter to track request counts per client IP address.
#   (You can also use custom keys, such as API keys or user IDs).
limiter = Limiter(key_func=get_remote_address)

# Attach the limiter instance to the FastAPI app state so it is accessible globally.
app.state.limiter = limiter


# 4. EXCEPTION HANDLER FOR RATE LIMIT EXCEEDED
# ------------------------------------------------------------------------------
# This custom exception handler catches any `RateLimitExceeded` error when a client makes
# too many requests, and returns a clean, human-readable JSON response instead of a raw crash/error.
@app.exception_handler(RateLimitExceeded)
def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    """
    Handles requests that exceed the configured rate limit.
    Returns HTTP 429 (Too Many Requests).
    """
    return JSONResponse(
        status_code=429,  # Standard HTTP status code for 'Too Many Requests'
        content={
            "error": "Rate limit exceeded",
            "details": "Too many requests. Please try again later."
        }
    )


# 5. PROTECTED ROUTE / ENDPOINT
# ------------------------------------------------------------------------------
# @app.get("/data"): Defines a GET route at path '/data'.
# @limiter.limit("5/minute"): Restricts calls to this specific endpoint to 5 requests per minute per IP address.
# Note: When using @limiter.limit, the endpoint function MUST accept `request: Request` as a parameter.
@app.get("/data")
@limiter.limit("5/minute")
def get_data(request: Request):
    """
    Sample endpoint protected by rate limiting.
    Allows a maximum of 5 requests per minute per client IP.
    """
    return {
        "message": "Success"
    }