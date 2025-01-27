import { motion } from "framer-motion";

const ActivePositions = () => {
  const positions = [
    {
      id: 1,
      pair: "ETH/USD",
      type: "LONG",
      entry: 2450.0,
      current: 2480.0,
      pnl: "+1.22%",
      size: "5.0 ETH",
      leverage: "10x",
    },
    {
      id: 2,
      pair: "BTC/USD",
      type: "SHORT",
      entry: 39800.0,
      current: 39600.0,
      pnl: "+0.50%",
      size: "0.5 BTC",
      leverage: "5x",
    },
  ];

  return (
    <div className="bg-[#151C2F] rounded-2xl p-6 shadow-xl border border-blue-900/20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Active Positions</h2>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
          New Trade
        </button>
      </div>

      <div className="space-y-4">
        {positions.map((position, index) => (
          <motion.div
            key={position.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#1E2839] rounded-xl p-4 hover:bg-[#252F44] transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-3">
                  <h3 className="font-bold text-white">{position.pair}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      position.type === "LONG"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {position.type}
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Size:</span>
                    <span className="ml-2 text-white">{position.size}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Leverage:</span>
                    <span className="ml-2 text-white">{position.leverage}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <motion.div
                  key={position.pnl}
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  className={`text-lg font-bold ${
                    position.pnl.startsWith("+")
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {position.pnl}
                </motion.div>
                <div className="mt-1 text-sm">
                  <div className="text-gray-400">
                    Entry: ${position.entry.toFixed(2)}
                  </div>
                  <div className="text-gray-400">
                    Current: ${position.current.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActivePositions;
