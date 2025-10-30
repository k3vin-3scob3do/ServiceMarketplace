from enum import Enum
from typing import Optional
from pydantic import BaseModel, EmailStr

class UserRole(str, Enum):
    CLIENT = 'client'
    PROVIDER = 'provider'
    ADMIN = 'admin'
    
class User(BaseModel):
    _id: Optional[str] = None
    name: str
    surnames: str
    email: EmailStr
    password: str
    role: UserRole = UserRole.CLIENT