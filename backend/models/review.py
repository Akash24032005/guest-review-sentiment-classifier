from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId

class ReviewModel(BaseModel):
    text: str
    sentiment: Optional[str] = "pending"
    theme: Optional[str] = "General"
    response: Optional[str] = ""

    class Config:
        arbitrary_types_allowed = True