const TradingPosition = () => {
  const positions = [
    {
      pair: "ETH/USD",
      type: "Long",
      entry: "2450.00",
      current: "2480.00",
      pnl: "+1.22%",
      size: "5.0 ETH",
      leverage: "10x",
    },
    {
      pair: "BTC/USD",
      type: "Short",
      entry: "39800.00",
      current: "39600.00",
      pnl: "+0.50%",
      size: "0.5 BTC",
      leverage: "5x",
    },
  ];

  return (
    <div className="space-y-4">
      {positions.map((position, idx) => (
        <div
          key={idx}
          className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-xl"
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center space-x-3">
                <h3 className="font-bold text-lg text-white">
                  {position.pair}
                </h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    position.type === "Long"
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
              <div
                className={`text-lg font-bold ${
                  position.pnl.startsWith("+")
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {position.pnl}
              </div>
              <div className="mt-1 text-sm">
                <div className="text-gray-400">Entry: {position.entry}</div>
                <div className="text-gray-400">Current: {position.current}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TradingPosition;
