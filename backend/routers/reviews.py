from fastapi import APIRouter, HTTPException
from bson import ObjectId
from database import reviews_collection
from models.review import ReviewModel

router = APIRouter()

def str_id(doc):
    doc["id"] = str(doc["_id"])
    del doc["_id"]
    return doc

# GET all reviews
@router.get("/reviews", status_code=200)
async def get_reviews():
    reviews = []
    async for review in reviews_collection.find():
        reviews.append(str_id(review))
    return {"data": reviews, "count": len(reviews)}

# GET single review
@router.get("/reviews/{review_id}", status_code=200)
async def get_review(review_id: str):
    review = await reviews_collection.find_one({"_id": ObjectId(review_id)})
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    return str_id(review)

# POST create review
@router.post("/reviews", status_code=201)
async def create_review(review: ReviewModel):
    result = await reviews_collection.insert_one(review.dict())
    new_review = await reviews_collection.find_one({"_id": result.inserted_id})
    return str_id(new_review)

# PUT update review
@router.put("/reviews/{review_id}", status_code=200)
async def update_review(review_id: str, updated: ReviewModel):
    result = await reviews_collection.update_one(
        {"_id": ObjectId(review_id)},
        {"$set": updated.dict()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Review not found")
    review = await reviews_collection.find_one({"_id": ObjectId(review_id)})
    return str_id(review)

# DELETE review
@router.delete("/reviews/{review_id}", status_code=204)
async def delete_review(review_id: str):
    result = await reviews_collection.delete_one({"_id": ObjectId(review_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Review not found")

# GET search reviews
@router.get("/reviews/search/query", status_code=200)
async def search_reviews(q: str):
    reviews = []
    async for review in reviews_collection.find(
        {"text": {"$regex": q, "$options": "i"}}
    ):
        reviews.append(str_id(review))
    if not reviews:
        raise HTTPException(status_code=404, detail="No reviews found")
    return {"data": reviews, "count": len(reviews)}