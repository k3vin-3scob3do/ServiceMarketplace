from fastapi import APIRouter, HTTPException
from controllers import auth_controller

router = APIRouter(prefix = "/auth", tags = ["Auth"])

@router.post("/login")
def login(email: str, password: str):
    return auth_controller.login(email, password) 
    

