from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class ReviewInput(BaseModel):
    review: str

POSITIVE_WORDS = ["amazing", "excellent", "great", "loved", "fantastic", "wonderful", "good", "best", "happy", "clean", "friendly", "welcoming", "beautiful", "perfect", "nice", "awesome", "superb", "enjoyed"]
NEGATIVE_WORDS = ["bad", "terrible", "awful", "dirty", "poor", "worst", "horrible", "disgusting", "rude", "disappointing", "pathetic", "unhappy", "worst", "noisy", "broken", "slow", "cold", "uncomfortable"]

def get_sentiment(review: str):
    review_lower = review.lower()
    pos = sum(1 for w in POSITIVE_WORDS if w in review_lower)
    neg = sum(1 for w in NEGATIVE_WORDS if w in review_lower)
    if pos > neg:
        return "positive"
    elif neg > pos:
        return "negative"
    else:
        return "neutral"

def get_theme(review: str):
    review_lower = review.lower()
    if any(w in review_lower for w in ["food", "meal", "breakfast", "dinner", "lunch", "eat", "cook"]):
        return "Food & Host"
    elif any(w in review_lower for w in ["host", "staff", "welcoming", "friendly", "service", "owner"]):
        return "Food & Host"
    elif any(w in review_lower for w in ["clean", "dirty", "dust", "hygiene", "bathroom", "toilet"]):
        return "Cleanliness"
    elif any(w in review_lower for w in ["location", "view", "area", "nearby", "place", "mountain"]):
        return "Location"
    elif any(w in review_lower for w in ["price", "value", "money", "worth", "cheap", "expensive"]):
        return "Value"
    else:
        return "Experience"

def get_response(sentiment: str, theme: str):
    responses = {
        "positive": f"Thank you for your wonderful feedback about {theme.lower()}!",
        "neutral": f"Thank you for sharing your thoughts. We'll work on improving {theme.lower()}.",
        "negative": f"We sincerely apologize for the experience. We'll address the {theme.lower()} issue immediately."
    }
    return responses.get(sentiment, "Thank you for your feedback!")

@router.post("/ai/classify", status_code=200)
async def classify_review(data: ReviewInput):
    try:
        sentiment = get_sentiment(data.review)
        theme = get_theme(data.review)
        response = get_response(sentiment, theme)
        return {
            "sentiment": sentiment,
            "theme": theme,
            "response": response
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Classification failed: {str(e)}")