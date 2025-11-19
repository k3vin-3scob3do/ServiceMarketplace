from fastapi import APIRouter, HTTPException
from controllers import user_controller
from models.user import User, UserRole, UserStatus

router = APIRouter(prefix = "/user", tags = ["User"])

@router.post("/register")
def registerUser(user: User):
    return user_controller.registerUser(user)

@router.get("/")
def getUsers(role: UserRole = UserRole.CLIENT):
    return user_controller.getUsers(role)

@router.get("/{userId}")
def getUser(userId: str):
    return user_controller.getUser(userId)

@router.put("/update/{userId}")
def updateUser(userId, user: User):
    return user_controller.updateUser(userId, user)

@router.delete("/delete/{userId}")
def deleteUser(userId: str):
    return user_controller.deleteUser(userId)

@router.put("/status/{userId}")
def updateStatus(userId: str, status: UserStatus):
    return user_controller.updateStatus(userId, status)