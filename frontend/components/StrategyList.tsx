const StrategyList = () => {
  const strategies = [
    {
      id: 1,
      name: "AI Momentum",
      winRate: "68%",
      profit: "+12.5%",
      risk: "Medium",
      description: "AI-powered momentum trading strategy",
    },
    {
      id: 2,
      name: "Smart Grid",
      winRate: "72%",
      profit: "+15.8%",
      risk: "Low",
      description: "Automated grid trading with smart entry/exit",
    },
    {
      id: 3,
      name: "Neural Trend",
      winRate: "65%",
      profit: "+18.2%",
      risk: "High",
      description: "Deep learning trend prediction system",
    },
  ];

  return (
    <div className="space-y-4">
      {strategies.map((strategy) => (
        <div
          key={strategy.id}
          className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-xl 
                     hover:from-gray-700 hover:to-gray-600 transition-all duration-300 
                     transform hover:-translate-y-1 hover:shadow-xl cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-white">{strategy.name}</h3>
              <p className="text-gray-400 text-sm mt-1">
                {strategy.description}
              </p>
            </div>
            <span className="text-green-400 font-bold text-lg">
              {strategy.profit}
            </span>
          </div>

          <div className="mt-4 flex items-center space-x-6 text-sm">
            <div className="flex items-center">
              <span className="text-gray-400">Win Rate:</span>
              <span className="ml-2 text-white font-medium">
                {strategy.winRate}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400">Risk:</span>
              <span
                className={`ml-2 font-medium ${
                  strategy.risk === "Low"
                    ? "text-green-400"
                    : strategy.risk === "Medium"
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {strategy.risk}
              </span>
            </div>
          </div>

          <div className="mt-2 w-full bg-gray-700 rounded-full h-1.5">
            <div 
              className="bg-blue-600 h-1.5 rounded-full" 
              style={{ width: strategy.winRate }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StrategyList;
