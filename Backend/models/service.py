from enum import Enum
from typing import Optional
from pydantic import BaseModel, EmailStr

class ServiceCategory(str, Enum):
    TECHNOLOGY = 'tecnologia'
    EDUCATION = 'educacion'
    HEALTH = 'salud'
    HOME = 'hogar'
    BUSINESS = 'negocios'
    TRANSPORT = 'transporte'
    CREATIVE = 'creatividad'
    MARKETING = 'marketing'
    OTHER = 'otro'

class ServiceStatus(str, Enum):
    PENDING = "pendiente"
    APPROVED = "aprobado"
    REJECTED = "rechazado"

class Service(BaseModel):
    _id: Optional[str] = None
    category: ServiceCategory = ServiceCategory.OTHER
    name: str
    provider_id: str
    description: str
    price: float
    status: ServiceStatus = ServiceStatus.PENDING
    images: Optional[list[str]]
    
    
    