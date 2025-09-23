from enum import Enum
from pydantic import BaseModel, EmailStr

class UserRole(str, Enum):
    CLIENT = 'client'
    PROVIDER = 'provider'
    ADMIN = 'admin'
    
class User(BaseModel):
    name: str
    surnames: str
    email: EmailStr
    password: str
    role: UserRole = UserRole.CLIENT