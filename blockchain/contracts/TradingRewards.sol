// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TradingRewards is ERC20, Ownable {
    mapping(address => uint256) public traderScores;
    uint256 public rewardPool;
    uint256 public constant MINIMUM_SCORE = 100;
    
    constructor() ERC20("Trading Rewards", "TRAD") {}
    
    function addToRewardPool() external payable {
        rewardPool += msg.value;
    }
    
    function updateTraderScore(address trader, uint256 score) external onlyOwner {
        traderScores[trader] = score;
    }
    
    function claimRewards() external {
        require(traderScores[msg.sender] >= MINIMUM_SCORE, "Insufficient score");
        
        uint256 reward = (traderScores[msg.sender] * rewardPool) / 10000;
        require(reward > 0, "No rewards available");
        
        traderScores[msg.sender] = 0;
        payable(msg.sender).transfer(reward);
    }
} 