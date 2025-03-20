from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import StreamingResponse
from datetime import datetime
import asyncio
import random

app = FastAPI()

templates = Jinja2Templates(directory="templates")

QUOTES = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Be the change you wish to see in the world. - Mahatma Gandhi",
    "Stay hungry, stay foolish. - Steve Jobs",
    "You miss 100% of the shots you don’t take. - Wayne Gretzky",
]


@app.get("/")
async def serve_root_page(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


async def quote_generator():
    while True:
        quote = random.choice(QUOTES)
        yield f"data: {quote}\n\n"
        await asyncio.sleep(5)


async def date_generator():
    while True:
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        yield f"data: {now}\n\n"
        await asyncio.sleep(1)


@app.get("/sse")
def sse():
    return StreamingResponse(quote_generator(), media_type="text/event-stream")
