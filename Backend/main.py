from fastapi import FastAPI
from routes import user, service, review 


app = FastAPI()

app.include_router(user.router)
app.include_router(service.router)
app.include_router(review.router)