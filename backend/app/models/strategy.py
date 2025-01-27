from pydantic import BaseModel
from typing import Dict, Optional
from datetime import datetime

class Strategy(BaseModel):
    id: Optional[str]
    name: str
    description: str
    creator_address: str
    parameters: Dict
    ipfs_hash: Optional[str]
    created_at: datetime = datetime.utcnow()
    performance_metrics: Dict = {
        "roi": 0,
        "sharpe_ratio": 0,
        "max_drawdown": 0
    }

class StrategyCreate(BaseModel):
    name: str
    description: str
    parameters: Dict
    creator_address: str 