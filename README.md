# Guest Review Sentiment Classifier

A web-based AI tool for Trishul Eco-Homestays to classify guest reviews by sentiment, theme, and generate suggested responses.

## Tech Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: FastAPI (Python)
- Database: MongoDB Atlas

## Database
MongoDB Atlas (Free Tier) — chosen for flexible document-based storage, ideal for unstructured guest review data.

## How to set up the database
1. Create a free cluster on MongoDB Atlas
2. Add your connection string to .env as MONGO_URI
3. Run the backend — collections are created automatically

## How to run backend locally
1. cd backend
2. venv\Scripts\activate
3. pip install -r requirements.txt
4. uvicorn main:app --reload

## How to run frontend locally
1. npm install
2. npm run dev