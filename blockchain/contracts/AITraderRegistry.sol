// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract AITraderRegistry is Ownable, ReentrancyGuard {
    struct Strategy {
        address creator;
        string ipfsHash;     // Hash of strategy metadata
        uint256 price;       // Price in native token
        uint256 rating;      // Average rating (1-100)
        uint256 totalRaters; // Number of raters
    }
    
    mapping(uint256 => Strategy) public strategies;
    uint256 public nextStrategyId;
    
    event StrategyRegistered(uint256 indexed strategyId, address indexed creator, string ipfsHash);
    event StrategyPurchased(uint256 indexed strategyId, address indexed buyer);
    
    function registerStrategy(string memory _ipfsHash, uint256 _price) external nonReentrant {
        strategies[nextStrategyId] = Strategy({
            creator: msg.sender,
            ipfsHash: _ipfsHash,
            price: _price,
            rating: 0,
            totalRaters: 0
        });
        
        emit StrategyRegistered(nextStrategyId, msg.sender, _ipfsHash);
        nextStrategyId++;
    }
    
    function purchaseStrategy(uint256 _strategyId) external payable nonReentrant {
        Strategy storage strategy = strategies[_strategyId];
        require(msg.value >= strategy.price, "Insufficient payment");
        
        // Transfer payment to creator
        payable(strategy.creator).transfer(msg.value);
        
        emit StrategyPurchased(_strategyId, msg.sender);
    }
} 