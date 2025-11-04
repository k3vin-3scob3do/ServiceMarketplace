from fastapi import APIRouter, HTTPException
from Backend.models.user import User
from Backend.controllers import auth_controller

router = APIRouter(prefix = "/auth", tags = ["Auth"])

@router.post("/login")
def login(email: str, password: str):
    return auth_controller.login(email, password) 
    

