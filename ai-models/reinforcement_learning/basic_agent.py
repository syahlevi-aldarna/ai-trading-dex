import numpy as np
from typing import List, Dict

class BasicTradingAgent:
    def __init__(self, state_size: int, action_size: int):
        self.state_size = state_size
        self.action_size = action_size
        self.memory = []
        self.gamma = 0.95    # discount rate
        self.epsilon = 1.0   # exploration rate
        self.epsilon_min = 0.01
        self.epsilon_decay = 0.995
        
    def act(self, state: np.ndarray) -> int:
        if np.random.rand() <= self.epsilon:
            return np.random.randint(self.action_size)
        # TODO: Implementasi model prediksi
        return 0
    
    def train(self, state: np.ndarray, action: int, reward: float, next_state: np.ndarray):
        self.memory.append((state, action, reward, next_state))
        # TODO: Implementasi training loop
        
        if self.epsilon > self.epsilon_min:
            self.epsilon *= self.epsilon_decay 