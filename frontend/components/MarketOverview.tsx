import { motion } from "framer-motion";
import SparklineChart from "./SparklineChart";

const MarketOverview = () => {
  const markets = [
    {
      symbol: "BTC/USD",
      icon: "₿",
      price: 42850.0,
      change: "+2.5%",
      volume: "$28.5B",
      sparkline: [41000, 42000, 41500, 42850, 42700, 42850],
    },
    {
      symbol: "ETH/USD",
      price: 2280.0,
      change: "+3.2%",
      volume: "$15.2B",
      sparkline: [2200, 2250, 2220, 2280],
    },
    {
      symbol: "BNB/USD",
      price: 305.5,
      change: "-0.8%",
      volume: "$2.1B",
      sparkline: [308, 306, 304, 305.5],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <div className="market-card">
        <h2 className="text-xl font-semibold mb-4">BTC/USD</h2>
        <div className="chart-wrapper">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="group relative overflow-hidden bg-[#151C2F]/80 backdrop-blur-xl rounded-xl p-6 
                       border border-blue-900/20 hover:border-blue-600/40 transition-all duration-300"
          >
            {/* Animated Background */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 
                           translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
            />

            <div className="relative">
              <div className="flex items-center space-x-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 
                              flex items-center justify-center text-xl font-bold"
                >
                  {markets[0].icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {markets[0].symbol}
                  </h3>
                  <span
                    className={`text-sm font-medium ${
                      markets[0].change.startsWith("+")
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {markets[0].change}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-4">
                <p className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  $
                  {markets[0].price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Volume</p>
                  <p className="text-sm font-medium text-white">
                    {markets[0].volume}
                  </p>
                </div>
              </div>

              <div className="h-16">
                <SparklineChart
                  data={markets[0].sparkline}
                  color={
                    markets[0].change.startsWith("+") ? "#22c55e" : "#ef4444"
                  }
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="market-card">
        <h2 className="text-xl font-semibold mb-4">ETH/USD</h2>
        <div className="chart-wrapper">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="group relative overflow-hidden bg-[#151C2F]/80 backdrop-blur-xl rounded-xl p-6 
                       border border-blue-900/20 hover:border-blue-600/40 transition-all duration-300"
          >
            {/* Animated Background */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 
                           translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
            />

            <div className="relative">
              <div className="flex items-center space-x-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 
                              flex items-center justify-center text-xl font-bold"
                >
                  {markets[1].icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {markets[1].symbol}
                  </h3>
                  <span
                    className={`text-sm font-medium ${
                      markets[1].change.startsWith("+")
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {markets[1].change}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-4">
                <p className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  $
                  {markets[1].price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Volume</p>
                  <p className="text-sm font-medium text-white">
                    {markets[1].volume}
                  </p>
                </div>
              </div>

              <div className="h-16">
                <SparklineChart
                  data={markets[1].sparkline}
                  color={
                    markets[1].change.startsWith("+") ? "#22c55e" : "#ef4444"
                  }
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="market-card">
        <h2 className="text-xl font-semibold mb-4">BNB/USD</h2>
        <div className="chart-wrapper">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="group relative overflow-hidden bg-[#151C2F]/80 backdrop-blur-xl rounded-xl p-6 
                       border border-blue-900/20 hover:border-blue-600/40 transition-all duration-300"
          >
            {/* Animated Background */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 
                           translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
            />

            <div className="relative">
              <div className="flex items-center space-x-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 
                              flex items-center justify-center text-xl font-bold"
                >
                  {markets[2].icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {markets[2].symbol}
                  </h3>
                  <span
                    className={`text-sm font-medium ${
                      markets[2].change.startsWith("+")
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {markets[2].change}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-4">
                <p className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  $
                  {markets[2].price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Volume</p>
                  <p className="text-sm font-medium text-white">
                    {markets[2].volume}
                  </p>
                </div>
              </div>

              <div className="h-16">
                <SparklineChart
                  data={markets[2].sparkline}
                  color={
                    markets[2].change.startsWith("+") ? "#22c55e" : "#ef4444"
                  }
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;
