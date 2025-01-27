import { useState } from "react";
import Navbar from "../components/Navbar";
import TradingChart from "../components/TradingChart";
import MarketOverview from "../components/MarketOverview";
import AIStrategies from "../components/AIStrategies";
import ActivePositions from "../components/ActivePositions";
import TradingStats from "../components/TradingStats";

export default function Home() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1H");

  return (
    <div className="main-layout">
      <aside className="sidebar">{/* Sidebar content */}</aside>

      <main className="main-content">
        <Navbar />

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 border-y border-blue-900/20">
          <div className="container mx-auto py-8">
            <TradingStats />
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-8">
          {/* Market Overview Cards */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              Market Overview
            </h2>
            <MarketOverview />
          </div>

          {/* Trading Chart Section */}
          <div className="bg-[#151C2F]/80 backdrop-blur-xl rounded-2xl border border-blue-900/20 shadow-xl mb-8">
            <div className="p-4 border-b border-blue-900/20">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <h2 className="text-xl font-bold text-white">
                    Advanced Trading
                  </h2>
                  <div className="flex bg-[#1E2839] rounded-lg p-1">
                    {["1H", "4H", "1D", "1W"].map((timeframe) => (
                      <button
                        key={timeframe}
                        onClick={() => setSelectedTimeframe(timeframe)}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all
                          ${
                            selectedTimeframe === timeframe
                              ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                              : "text-gray-400 hover:text-white hover:bg-[#252F44]"
                          }`}
                      >
                        {timeframe}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-[#252F44] rounded-lg transition-all">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-[#252F44] rounded-lg transition-all">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <TradingChart timeframe={selectedTimeframe} />
            </div>
          </div>

          {/* Trading Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AIStrategies />
            </div>
            <div>
              <ActivePositions />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
