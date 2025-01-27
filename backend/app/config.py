from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    # Database
    MONGODB_URI: str
    DATABASE_URL: str
    
    # Server
    PORT: int = 8000
    
    # Web3
    WEB3_PROVIDER_URL: str
    BASE_RPC_URL: str
    ETHERSCAN_API_KEY: str
    
    # Security
    JWT_SECRET: str
    
    class Config:
        env_file = ".env"

# MongoDB configuration
MONGODB_URL = "mongodb://localhost:27017"
DATABASE_NAME = "trading"

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings() 