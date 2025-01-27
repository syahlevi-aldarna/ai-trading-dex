from pymongo import MongoClient
from typing import Dict, List, Optional

class MongoDBManager:
    def __init__(self, connection_url: str = 'mongodb://localhost:27017/'):
        self.client = MongoClient(connection_url)
        self.db = self.client.trading

    def add_strategy(self, strategy_data: Dict) -> str:
        """Menambahkan strategy baru"""
        result = self.db.strategies.insert_one(strategy_data)
        return str(result.inserted_id)

    def get_strategy(self, strategy_id: str) -> Optional[Dict]:
        """Mengambil strategy berdasarkan ID"""
        return self.db.strategies.find_one({"_id": strategy_id})

    def get_all_strategies(self) -> List[Dict]:
        """Mengambil semua strategies"""
        return list(self.db.strategies.find())

    def update_strategy(self, strategy_id: str, update_data: Dict) -> bool:
        """Update strategy"""
        result = self.db.strategies.update_one(
            {"_id": strategy_id},
            {"$set": update_data}
        )
        return result.modified_count > 0

    def delete_strategy(self, strategy_id: str) -> bool:
        """Hapus strategy"""
        result = self.db.strategies.delete_one({"_id": strategy_id})
        return result.deleted_count > 0 