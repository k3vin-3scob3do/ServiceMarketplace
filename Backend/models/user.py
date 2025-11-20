from enum import Enum
from typing import Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr

class UserRole(str, Enum):
    CLIENT = 'cliente'
    PROVIDER = 'proveedor'
    ADMIN = 'administrador'

class UserStatus(str, Enum):
    PENDING = 'pendiente'
    VERIFIED = 'verificado'
    BLOCKED = 'bloqueado'
    
class User(BaseModel):
    _id: Optional[str] = None
    name: str
    email: EmailStr 
    phone: Optional[int]
    password: str
    role: UserRole = UserRole.CLIENT
    status: Optional[UserStatus] = UserStatus.PENDING
    register_date: Optional[datetime] = None

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[int] = None
    password: Optional[str] = None
    role: Optional[str] = None
    status: Optional[str] = None

