from fastapi import HTTPException
from typing import List, Dict, Optional
import numpy as np
from web3 import Web3
from datetime import datetime
from ..utils.mongo_utils import MongoDBManager
from bson import ObjectId

class TradingService:
    def __init__(self, mongo_client, web3_client):
        self.db = mongo_client
        self.web3 = web3_client
        self.trading_agents = {}
    
    async def create_trading_strategy(self, strategy_data: Dict) -> Dict:
        try:
            # Validate strategy parameters
            self._validate_strategy(strategy_data)
            
            # Store metadata to IPFS
            ipfs_hash = await self._store_to_ipfs(strategy_data)
            
            # Create database entry
            strategy_doc = {
                "name": strategy_data["name"],
                "description": strategy_data["description"],
                "parameters": strategy_data["parameters"],
                "ipfs_hash": ipfs_hash,
                "creator_address": strategy_data["creator_address"],
                "created_at": datetime.utcnow(),
                "performance_metrics": {
                    "roi": 0,
                    "sharpe_ratio": 0,
                    "max_drawdown": 0
                }
            }
            
            result = await self.db.strategies.insert_one(strategy_doc)
            return {"strategy_id": str(result.inserted_id), "ipfs_hash": ipfs_hash}
            
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    
    async def get_strategy_performance(self, strategy_id: str) -> Dict:
        # Simulate strategy performance calculation
        return {
            "roi": np.random.uniform(0.1, 0.3),
            "sharpe_ratio": np.random.uniform(1.5, 2.5),
            "max_drawdown": np.random.uniform(0.1, 0.2),
            "win_rate": np.random.uniform(0.5, 0.7)
        }
    
    def _validate_strategy(self, strategy_data: Dict) -> bool:
        required_fields = ["name", "description", "parameters", "creator_address"]
        if not all(field in strategy_data for field in required_fields):
            raise ValueError("Missing required strategy fields")
        return True
    
    async def _store_to_ipfs(self, data: Dict) -> str:
        # TODO: Implement IPFS storage
        return "QmHash..."  # Placeholder 

    async def create_strategy(self, strategy: dict):
        try:
            # Insert strategy ke collection strategies
            result = await self.db.strategies.insert_one(strategy)
            
            # Convert ObjectId ke string
            strategy_id = str(result.inserted_id)
            
            return {
                "status": "success",
                "strategy_id": strategy_id
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    async def get_strategy(self, strategy_id: str):
        try:
            # Ubah cara mengambil single document
            strategy = await self.db.strategies.find_one({"_id": ObjectId(strategy_id)})
            if not strategy:
                raise HTTPException(status_code=404, detail="Strategy not found")
            
            strategy["_id"] = str(strategy["_id"])
            return {
                "status": "success",
                "data": strategy
            }
        except Exception as e:
            if isinstance(e, HTTPException):
                raise e
            raise HTTPException(status_code=500, detail=str(e))

    async def list_strategies(self) -> List[Dict]:
        """Ambil semua strategies"""
        return self.db.get_all_strategies()

    async def test_db_connection(self):
        try:
            # Test read dari collection strategies
            count = await self.db.strategies.count_documents({})
            return {
                "connected": True,
                "strategy_count": count
            }
        except Exception as e:
            return {
                "connected": False,
                "error": str(e)
            }

    async def test_web3_connection(self):
        try:
            block = self.web3.eth.block_number
            return {
                "connected": True,
                "current_block": block
            }
        except Exception as e:
            return {
                "connected": False,
                "error": str(e)
            }

    async def cleanup_duplicate_strategies(self):
        try:
            strategies = self.db.get_all_strategies()
            seen_names = {}
            duplicates = []
            
            for strategy in strategies:
                if strategy['name'] in seen_names:
                    duplicates.append(strategy['_id'])
                else:
                    seen_names[strategy['name']] = strategy['_id']
                    
            for duplicate_id in duplicates:
                self.db.delete_strategy(duplicate_id)
                
            return {
                "status": "success",
                "deleted_count": len(duplicates)
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    async def get_all_strategies(self):
        try:
            cursor = self.db.strategies.find()
            strategies = []
            async for doc in cursor:
                doc["_id"] = str(doc["_id"])
                strategies.append(doc)
            return {
                "status": "success",
                "data": strategies
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    async def update_strategy(self, strategy_id: str, strategy: dict):
        try:
            result = await self.db.strategies.update_one(
                {"_id": ObjectId(strategy_id)},
                {"$set": strategy}
            )
            if result.modified_count == 0:
                raise HTTPException(status_code=404, detail="Strategy not found")
            return {"status": "success", "message": "Strategy updated"}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    async def delete_strategy(self, strategy_id: str):
        try:
            result = await self.db.strategies.delete_one({"_id": ObjectId(strategy_id)})
            if result.deleted_count == 0:
                raise HTTPException(status_code=404, detail="Strategy not found")
            return {"status": "success", "message": "Strategy deleted"}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e)) 