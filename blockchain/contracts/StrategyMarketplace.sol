// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StrategyMarketplace is ReentrancyGuard, Ownable {
    struct Strategy {
        address creator;
        string ipfsHash;
        uint256 price;
        uint256 rating;
        uint256 totalRaters;
        bool isActive;
        uint256 totalRevenue;
        uint256 purchaseCount;
    }

    struct Trader {
        uint256 reputation;
        uint256[] purchasedStrategies;
        uint256[] createdStrategies;
        uint256 totalEarnings;
    }

    mapping(uint256 => Strategy) public strategies;
    mapping(address => Trader) public traders;
    mapping(uint256 => mapping(address => bool)) public hasRated;
    
    uint256 public nextStrategyId;
    uint256 public platformFee = 50; // 0.5%
    
    event StrategyListed(uint256 indexed strategyId, address indexed creator, uint256 price);
    event StrategyPurchased(uint256 indexed strategyId, address indexed buyer, uint256 price);
    event StrategyRated(uint256 indexed strategyId, address indexed rater, uint256 rating);
    
    function listStrategy(string memory _ipfsHash, uint256 _price) external nonReentrant {
        require(_price > 0, "Price must be greater than 0");
        
        strategies[nextStrategyId] = Strategy({
            creator: msg.sender,
            ipfsHash: _ipfsHash,
            price: _price,
            rating: 0,
            totalRaters: 0,
            isActive: true,
            totalRevenue: 0,
            purchaseCount: 0
        });
        
        traders[msg.sender].createdStrategies.push(nextStrategyId);
        
        emit StrategyListed(nextStrategyId, msg.sender, _price);
        nextStrategyId++;
    }
    
    function purchaseStrategy(uint256 _strategyId) external payable nonReentrant {
        Strategy storage strategy = strategies[_strategyId];
        require(strategy.isActive, "Strategy is not active");
        require(msg.value >= strategy.price, "Insufficient payment");
        
        uint256 platformCut = (msg.value * platformFee) / 10000;
        uint256 creatorPayment = msg.value - platformCut;
        
        payable(strategy.creator).transfer(creatorPayment);
        payable(owner()).transfer(platformCut);
        
        strategy.totalRevenue += msg.value;
        strategy.purchaseCount++;
        
        traders[msg.sender].purchasedStrategies.push(_strategyId);
        traders[strategy.creator].totalEarnings += creatorPayment;
        
        emit StrategyPurchased(_strategyId, msg.sender, msg.value);
    }
    
    function rateStrategy(uint256 _strategyId, uint256 _rating) external {
        require(_rating >= 1 && _rating <= 100, "Rating must be between 1 and 100");
        require(!hasRated[_strategyId][msg.sender], "Already rated");
        
        Strategy storage strategy = strategies[_strategyId];
        
        uint256 newTotalRating = (strategy.rating * strategy.totalRaters) + _rating;
        strategy.totalRaters++;
        strategy.rating = newTotalRating / strategy.totalRaters;
        
        hasRated[_strategyId][msg.sender] = true;
        
        emit StrategyRated(_strategyId, msg.sender, _rating);
    }
} 