# AI Trading DEX

AI Trading DEX is a decentralized platform that leverages artificial intelligence to provide automated trading strategies for cryptocurrencies.

## Project Overview

This project combines blockchain technology with AI/ML to create a decentralized exchange where users can:

- Access AI-powered trading strategies
- Create and share their own strategies
- Execute trades using smart contracts
- Track performance metrics and analytics

## Architecture

The platform is built with a microservices architecture:

1. **Frontend**: React/Next.js application for user interface
2. **Backend**: FastAPI server for business logic and AI model serving
3. **Blockchain**: Smart contracts on Base Network (Ethereum L2)
4. **AI Models**: Reinforcement learning models for trading strategy optimization

## Tech Stack

- **Frontend**: Next.js, TailwindCSS, Web3Auth
- **Backend**: Python, FastAPI, MongoDB, PostgreSQL
- **Blockchain**: Solidity, Hardhat, Ethers.js
- **AI/ML**: PyTorch, NumPy

## Getting Started

### Prerequisites

- Node.js (v16+)
- Python (v3.9+)
- MongoDB
- PostgreSQL

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/ai-trading-dex.git
   cd ai-trading-dex
   ```

2. Set up environment variables:

   ```
   # Copy example env files
   cp .env.example .env
   cp frontend/.env.example frontend/.env.local
   cp backend/.env.example backend/.env
   ```

   Then fill in your own API keys and configuration values.

3. Install and run the frontend:

   ```
   cd frontend
   npm install
   npm run dev
   ```

4. Install and run the backend:

   ```
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```

5. Deploy smart contracts (optional):
   ```
   cd blockchain
   npm install
   npx hardhat compile
   npx hardhat deploy --network baseGoerli
   ```

## Project Structure

```
ai-trading-dex/
├── ai-models/              # ML models and training code
├── backend/                # FastAPI server
├── blockchain/             # Smart contracts
├── frontend/               # Next.js application
└── docs/                   # Documentation
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Base Network for the L2 infrastructure
- Web3Auth for authentication
- OpenAI for AI research inspiration
