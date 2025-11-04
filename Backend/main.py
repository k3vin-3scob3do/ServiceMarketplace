from fastapi import FastAPI
from routes import user, service

app = FastAPI()

app.include_router(user.router)
app.include_router(service.router)