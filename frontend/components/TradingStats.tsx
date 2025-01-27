const TradingStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-[#151C2F]/50 backdrop-blur-xl rounded-xl p-6 border border-blue-900/20">
        <h3 className="text-gray-400 text-sm">Total Trading Volume</h3>
        <p className="text-2xl font-bold text-white mt-2">$2.45M</p>
        <div className="flex items-center mt-2">
          <span className="text-green-400 text-sm">+12.5%</span>
          <span className="text-gray-500 text-sm ml-2">vs last week</span>
        </div>
      </div>

      <div className="bg-[#151C2F]/50 backdrop-blur-xl rounded-xl p-6 border border-blue-900/20">
        <h3 className="text-gray-400 text-sm">Active AI Strategies</h3>
        <p className="text-2xl font-bold text-white mt-2">24</p>
        <div className="flex items-center mt-2">
          <span className="text-green-400 text-sm">+3</span>
          <span className="text-gray-500 text-sm ml-2">new today</span>
        </div>
      </div>

      {/* Add more stats */}
    </div>
  );
};

export default TradingStats;
