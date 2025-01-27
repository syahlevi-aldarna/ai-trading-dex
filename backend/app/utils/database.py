from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

class Database:
    def __init__(self):
        self.client = MongoClient(os.getenv('MONGODB_URI'))
        self.db = self.client.ai_trading_dex
        
    def get_collection(self, collection_name):
        return self.db[collection_name]

    def close(self):
        self.client.close()