import asyncio
import time

# A mock coroutine simulating a network request to an API
async def fetch_data(api_name, delay):
    print(f"📡 Sending request to {api_name}...")
    # await asyncio.sleep simulates waiting for a network response without blocking the thread
    await asyncio.sleep(delay) 
    print(f"✅ Received data from {api_name}!")
    return f"{api_name} data"

async def main():
    start_time = time.time()
    
    # Schedule all three tasks to run concurrently
    results = await asyncio.gather(
        fetch_data("Google API", 3),
        fetch_data("Stripe API", 2),
        fetch_data("GitHub API", 1)
    )
    
    end_time = time.time()
    print(f"\nAll tasks finished in: {end_time - start_time:.2f} seconds")
    print(f"Results gathered: {results}")

# Start the event loop and run the main program
asyncio.run(main())