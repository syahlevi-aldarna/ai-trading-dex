import type { NextApiRequest, NextApiResponse } from "next";

type ChartData = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChartData[]>
) {
  const { timeframe } = req.query;

  // Generate mock data
  const data: ChartData[] = [];
  let time = new Date().getTime() - 100 * 60 * 60 * 1000; // Start 100 hours ago
  let price = 45000;

  for (let i = 0; i < 100; i++) {
    const open = price;
    const high = open + Math.random() * 1000;
    const low = open - Math.random() * 1000;
    const close = low + Math.random() * (high - low);

    data.push({
      time: Math.floor(time / 1000), // Convert to seconds for lightweight-charts
      open,
      high,
      low,
      close,
    });

    time += 60 * 60 * 1000; // Add 1 hour
    price = close;
  }

  res.status(200).json(data);
}
