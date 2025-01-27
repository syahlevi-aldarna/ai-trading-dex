import torch
import torch.optim as optim
from typing import List, Tuple
import numpy as np
from ..reinforcement_learning.advanced_trading_agent import AdvancedTradingAgent

class ModelTrainer:
    def __init__(self, state_size: int, action_size: int):
        self.agent = AdvancedTradingAgent(state_size, action_size)
        self.optimizer = optim.Adam(self.agent.model.parameters())
        
    def train_episode(self, 
                     data: List[Tuple[np.ndarray, int, float, np.ndarray, bool]],
                     batch_size: int = 64):
        losses = []
        for _ in range(len(data) // batch_size):
            batch = np.random.choice(data, batch_size)
            loss = self.agent.replay(batch)
            losses.append(loss)
            
        return np.mean(losses)
    
    def save_model(self, path: str):
        torch.save({
            'model_state_dict': self.agent.model.state_dict(),
            'optimizer_state_dict': self.optimizer.state_dict(),
        }, path)
    
    def load_model(self, path: str):
        checkpoint = torch.load(path)
        self.agent.model.load_state_dict(checkpoint['model_state_dict'])
        self.optimizer.load_state_dict(checkpoint['optimizer_state_dict']) 