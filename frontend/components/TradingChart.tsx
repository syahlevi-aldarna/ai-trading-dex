import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { createChart, ColorType } from "lightweight-charts";

const TradingChart = ({ timeframe }) => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndicator, setSelectedIndicator] = useState("none");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        const response = await fetch(`/api/chart-data?timeframe=${timeframe}`);
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error("Failed to fetch chart data:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [timeframe]);

  useEffect(() => {
    if (!chartData.length) return;

    const chartContainer = document.getElementById("chart-container");
    const chart = createChart(chartContainer, {
      layout: {
        background: { color: "#151C2F" },
        textColor: "#d1d4dc",
      },
      grid: {
        vertLines: { color: "#2a2e39" },
        horzLines: { color: "#2a2e39" },
      },
      width: chartContainer.clientWidth,
      height: 400,
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    candlestickSeries.setData(chartData);

    // Add indicators based on selection
    if (selectedIndicator === "ma") {
      const ma = chart.addLineSeries({
        color: "#2962FF",
        lineWidth: 2,
      });
      // Add MA calculation logic here
    }

    const handleResize = () => {
      chart.applyOptions({ width: chartContainer.clientWidth });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [chartData, selectedIndicator]);

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#151C2F]/80">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}

      <div className="flex items-center space-x-4 mb-4">
        <select
          value={selectedIndicator}
          onChange={(e) => setSelectedIndicator(e.target.value)}
          className="bg-[#1E2839] text-white px-4 py-2 rounded-lg border border-blue-900/20"
        >
          <option value="none">No Indicator</option>
          <option value="ma">Moving Average</option>
          <option value="rsi">RSI</option>
          <option value="macd">MACD</option>
        </select>
      </div>

      <div
        id="chart-container"
        className="w-full h-[400px] rounded-lg overflow-hidden"
      />
    </div>
  );
};

export default TradingChart;
