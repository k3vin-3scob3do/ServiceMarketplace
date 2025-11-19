from enum import Enum
from typing import Optional
from pydantic import BaseModel, EmailStr

class ContractStatus(str, Enum):
    REQUESTED = 'solicitado'
    REJECTED = 'rechazado'
    IN_PROGRESS = 'en_progreso'
    COMPLETED = 'completado'
    
class Contract(BaseModel):
    _id: Optional[str] = None
    client_id: str
    service_id: str
    description: str
    status: ContractStatus = ContractStatus.REQUESTED
    
    