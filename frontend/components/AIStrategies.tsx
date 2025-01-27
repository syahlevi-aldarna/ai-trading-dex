import { useState } from 'react';
import { motion } from 'framer-motion';

const AIStrategies = () => {
  const [selectedStrategy, setSelectedStrategy] = useState(null);

  const strategies = [
    {
      id: 1,
      name: 'AI Momentum',
      description: 'An advanced trend-following trading strategy',
      winRate: '85%',
      risk: 'Medium',
      performance: '+12.5%'
    },
    {
      id: 2,
      name: 'Smart Grid',
      description: 'Automated grid trading with smart placement',
      winRate: '72%',
      risk: 'Low',
      performance: '+8.3%'
    },
    {
      id: 3,
      name: 'Neural Trend',
      description: 'Deep learning based prediction system',
      winRate: '68%',
      risk: 'High',
      performance: '+18.7%'
    }
  ];

  const handleStrategyClick = (strategy) => {
    setSelectedStrategy(strategy.id === selectedStrategy?.id ? null : strategy);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center">
        <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
        AI Trading Strategies
      </h2>

      <div className="grid gap-4">
        {strategies.map((strategy) => (
          <motion.div
            key={strategy.id}
            className={`p-4 rounded-xl cursor-pointer transition-all ${
              selectedStrategy?.id === strategy.id
                ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30'
                : 'bg-[#1E2839] hover:bg-[#252F44]'
            }`}
            onClick={() => handleStrategyClick(strategy)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-white">{strategy.name}</h3>
                <p className="text-gray-400 mt-1">{strategy.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                strategy.performance.startsWith('+') 
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {strategy.performance}
              </span>
            </div>

            {selectedStrategy?.id === strategy.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-blue-900/20"
              >
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Win Rate</p>
                    <p className="text-white font-medium">{strategy.winRate}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Risk Level</p>
                    <p className="text-white font-medium">{strategy.risk}</p>
                  </div>
                  <div>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all">
                      Activate
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AIStrategies;
