from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime

class Review(BaseModel):
    _id: Optional[str] = None
    service_id: str
    user_id: str
    rating: int = Field(ge=1, le=5) 
    comment: Optional[str] = None
    created_at: datetime = datetime.utcnow()
