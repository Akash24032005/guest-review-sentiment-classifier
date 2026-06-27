from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

# In-memory data store
reviews = [
    {"id": 1, "text": "Great hospitality! Food was amazing.", "sentiment": "positive", "theme": "Food & Host", "response": "Thank you for your kind words!"},
    {"id": 2, "text": "Room was okay but cleanliness could be better.", "sentiment": "neutral", "theme": "Cleanliness", "response": "We appreciate your feedback!"},
    {"id": 3, "text": "Very poor experience overall.", "sentiment": "negative", "theme": "Experience", "response": "We sincerely apologize for the inconvenience."},
]

class Review(BaseModel):
    text: str
    sentiment: Optional[str] = "pending"
    theme: Optional[str] = "General"
    response: Optional[str] = ""

# GET all reviews
@router.get("/reviews", status_code=200)
def get_reviews():
    return {"data": reviews, "count": len(reviews)}

# GET single review
@router.get("/reviews/{review_id}", status_code=200)
def get_review(review_id: int):
    review = next((r for r in reviews if r["id"] == review_id), None)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    return review

# POST create review
@router.post("/reviews", status_code=201)
def create_review(review: Review):
    new_review = {
        "id": len(reviews) + 1,
        **review.dict()
    }
    reviews.append(new_review)
    return new_review

# PUT update review
@router.put("/reviews/{review_id}", status_code=200)
def update_review(review_id: int, updated: Review):
    for i, r in enumerate(reviews):
        if r["id"] == review_id:
            reviews[i] = {"id": review_id, **updated.dict()}
            return reviews[i]
    raise HTTPException(status_code=404, detail="Review not found")

# DELETE review
@router.delete("/reviews/{review_id}", status_code=204)
def delete_review(review_id: int):
    for i, r in enumerate(reviews):
        if r["id"] == review_id:
            reviews.pop(i)
            return
    raise HTTPException(status_code=404, detail="Review not found")

# GET search reviews
@router.get("/reviews/search/query", status_code=200)
def search_reviews(q: str):
    results = [r for r in reviews if q.lower() in r["text"].lower()]
    if not results:
        raise HTTPException(status_code=404, detail="No reviews found")
    return {"data": results, "count": len(results)}