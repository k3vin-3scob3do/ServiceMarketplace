from fastapi import APIRouter, HTTPException
from models.user import User, UserRole
from controllers import user_controller

router = APIRouter(prefix = "/users", tags = ["Users"])

@router.post("/")
def postUser(user: User):
    return user_controller.postUser(user)

@router.get("/")
def getUsers():
    return user_controller.getUsers()