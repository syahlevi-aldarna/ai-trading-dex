import { useState, useEffect } from "react";
import { useWeb3 } from "../hooks/useWeb3";
import { useTrading } from "../hooks/useTrading";
import TradingChart from "../components/TradingChart";
import StrategyList from "../components/StrategyList";
import PerformanceMetrics from "../components/PerformanceMetrics";
import { useAPI } from "../hooks/useAPI";

const Dashboard = () => {
  const { account, connect } = useWeb3();
  const { strategies, performance, loadStrategies } = useTrading();
  const [activeStrategy, setActiveStrategy] = useState(null);
  const { getStrategies, loading, error } = useAPI();

  useEffect(() => {
    if (account) {
      loadStrategies();
    }
  }, [account]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const strategies = await getStrategies();
        console.log("Strategies:", strategies);
      } catch (err) {
        console.error("Error loading strategies:", err);
      }
    };

    loadData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <header className="bg-gray-800 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">AI Trading Platform</h1>
          {!account ? (
            <button
              onClick={connect}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Connect Wallet
            </button>
          ) : (
            <span className="text-white">
              {account.slice(0, 6)}...{account.slice(-4)}
            </span>
          )}
        </div>
      </header>

      <main className="flex-1 p-6 grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <TradingChart strategy={activeStrategy} />
          <PerformanceMetrics data={performance} />
        </div>

        <div className="col-span-4">
          <StrategyList strategies={strategies} onSelect={setActiveStrategy} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
