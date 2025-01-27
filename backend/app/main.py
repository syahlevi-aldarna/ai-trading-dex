from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .models.strategy import Strategy, StrategyCreate
from .services.trading_service import TradingService
from .utils.database import Database
import os
from datetime import datetime
from bson import ObjectId
from web3 import Web3
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AI Trading Platform API")

# Konfigurasi CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Frontend development
        "https://your-production-domain.com"  # Production domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize MongoDB
mongo_client = AsyncIOMotorClient("mongodb://localhost:27017")
db = mongo_client.trading

# Initialize Web3 dengan Alchemy URL
WEB3_PROVIDER_URL = os.getenv("WEB3_PROVIDER_URL", "https://eth-sepolia.g.alchemy.com/v2/your-key")
web3 = Web3(Web3.HTTPProvider(WEB3_PROVIDER_URL))

# Gunakan db untuk trading_service
trading_service = TradingService(db, web3)

@app.post("/api/strategies/")
async def create_strategy(strategy: dict):
    return await trading_service.create_strategy(strategy)

@app.get("/api/strategies/{strategy_id}")
async def get_strategy(strategy_id: str):
    return await trading_service.get_strategy(strategy_id)

@app.get("/api/strategies/")
async def list_strategies():
    return await trading_service.get_all_strategies()

@app.get("/api/test")
async def test_endpoint():
    try:
        # Test database connection
        db_test = await trading_service.test_db_connection()
        
        # Test Web3 connection
        web3_test = await trading_service.test_web3_connection()
        
        return {
            "status": "success",
            "database": db_test,
            "web3": web3_test,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/strategies/{strategy_id}")
async def update_strategy(strategy_id: str, strategy: dict):
    return await trading_service.update_strategy(strategy_id, strategy)

@app.delete("/api/strategies/{strategy_id}")
async def delete_strategy(strategy_id: str):
    return await trading_service.delete_strategy(strategy_id)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 