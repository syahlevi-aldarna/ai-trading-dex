from pymongo import MongoClient

def test_connection():
    client = MongoClient('mongodb://localhost:27017/')
    db = client.trading
    
    # Test query
    strategies = list(db.strategies.find({"performance.roi": {"$gt": 20}}))
    print(f"Found {len(strategies)} strategies with ROI > 20")

if __name__ == "__main__":
    test_connection() 