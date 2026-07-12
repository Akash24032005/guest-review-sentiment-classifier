from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from slowapi import Limiter
from slowapi.util import get_remote_address
from database import db
from models.user import UserRegister, UserLogin, UserResponse
from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
from bson import ObjectId
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()
limiter = Limiter(key_func=get_remote_address)

JWT_SECRET = os.getenv("JWT_SECRET")
JWT_EXPIRY_DAYS = 7

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str):
    return pwd_context.verify(plain, hashed)

def create_token(user_id: str, email: str):
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.utcnow() + timedelta(days=JWT_EXPIRY_DAYS)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

# POST /api/auth/register
@router.post("/auth/register", status_code=201)
async def register(user: UserRegister):
    existing = await db["users"].find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed = hash_password(user.password)
    result = await db["users"].insert_one({
        "email": user.email,
        "password": hashed
    })
    return {"message": "User registered successfully", "id": str(result.inserted_id)}

# POST /api/auth/login
@router.post("/auth/login", status_code=200)
async def login(user: UserLogin):
    db_user = await db["users"].find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_token(str(db_user["_id"]), db_user["email"])
    return {"token": token, "email": db_user["email"]}

# GET /api/auth/me (protected)
@router.get("/auth/me", status_code=200)
async def get_me(current_user=Depends(get_current_user)):
    return {"email": current_user["email"], "id": current_user["sub"]}