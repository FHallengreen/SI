from fastapi import FastAPI, Form

app = FastAPI()


@app.post("/form")
def basic_form(
    username: str = Form(...), password: str = Form(default=..., min_length=8)
):
    return {"Username": username}
