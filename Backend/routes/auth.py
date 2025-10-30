from fastapi import APIRouter, HTTPException
from Backend.models.user import User
from Backend.controllers import user_controller

router = APIRouter(prefix = "/auth", tags = ["Auth"])

@router.post("/login")
def login():
    return 0
    

