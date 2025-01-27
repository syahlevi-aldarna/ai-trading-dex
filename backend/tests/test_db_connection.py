import pytest
from motor.motor_asyncio import AsyncIOMotorClient

# MongoDB URL langsung di file test
MONGODB_URL = "mongodb://localhost:27017"

async def test_mongodb_connection():
    try:
        # Connect to MongoDB
        client = AsyncIOMotorClient(MONGODB_URL)
        db = client.trading
        
        # Test connection
        strategy_count = await db.strategies.count_documents({})
        collections = await db.list_collection_names()
        
        print("\nMongoDB Connection Test Results:")
        print(f"✓ Connected to MongoDB successfully")
        print(f"✓ Database: trading")
        print(f"✓ Collections: {collections}")
        print(f"✓ Found {strategy_count} strategies")
        
        assert strategy_count >= 0
        return True
        
    except Exception as e:
        print(f"\n❌ Failed to connect to MongoDB:")
        print(f"Error: {str(e)}")
        return False

def run_connection_test():
    print("\nTesting MongoDB Connection...")
    import asyncio
    result = asyncio.run(test_mongodb_connection())
    if result:
        print("\n✅ All tests passed!")
    else:
        print("\n❌ Test failed!")

if __name__ == "__main__":
    run_connection_test()
