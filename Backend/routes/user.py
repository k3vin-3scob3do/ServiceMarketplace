from fastapi import APIRouter, HTTPException
from controllers import user_controller
from models.user import User, UserRole, UserStatus, UserUpdate
from models.user import User, UserRole, UserStatus, UserUpdate

router = APIRouter(prefix = "/user", tags = ["User"])

@router.post("/register")
def registerUser(user: User):
    return user_controller.registerUser(user)

@router.get("/")
def getUsers(role: UserRole = None, status: UserStatus = None):
    return user_controller.getUsers(role, status)

@router.get("/{userId}")
def getUser(userId: str):
    return user_controller.getUser(userId)

@router.delete("/delete/{userId}")
def deleteUser(userId: str):
    return user_controller.deleteUser(userId)

@router.put("/status/{userId}")
def updateStatus(userId: str, status: UserStatus):
    return user_controller.updateStatus(userId, status)

@router.put("/update/{userId}")
def updateUser(userId: str, user: UserUpdate):
    return user_controller.updateUser(userId, user)
