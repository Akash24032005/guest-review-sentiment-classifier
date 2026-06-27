from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import reviews

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(reviews.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Guest Review Classifier API is running"}