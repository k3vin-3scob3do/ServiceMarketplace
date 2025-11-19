from fastapi import FastAPI
from routes import auth, user, service, review, contract


app = FastAPI()

app.include_router(auth.router)
app.include_router(user.router)
app.include_router(service.router)
app.include_router(review.router)
app.include_router(contract.router)