import { useEffect, useState } from "react";
import { io } from "socket.io-client";

interface Indicator {
  name: string;
  value: number;
  signal: "buy" | "sell" | "neutral";
}

const TradingIndicators = () => {
  const [indicators, setIndicators] = useState<Indicator[]>([]);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("indicators", (data: Indicator[]) => {
      setIndicators(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {indicators.map((indicator) => (
        <div
          key={indicator.name}
          className={`p-4 rounded-lg ${
            indicator.signal === "buy"
              ? "bg-green-100"
              : indicator.signal === "sell"
              ? "bg-red-100"
              : "bg-gray-100"
          }`}
        >
          <h3 className="font-bold">{indicator.name}</h3>
          <p className="text-lg">{indicator.value}</p>
          <p className="capitalize">{indicator.signal}</p>
        </div>
      ))}
    </div>
  );
};

export default TradingIndicators;
