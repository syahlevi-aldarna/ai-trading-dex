import { useEffect, useRef } from "react";

interface SparklineChartProps {
  data: number[];
  color: string;
}

const SparklineChart = ({ data, color }: SparklineChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Calculate points
    const points = data.map((value, index) => ({
      x: (index / (data.length - 1)) * canvas.width,
      y:
        canvas.height -
        ((value - Math.min(...data)) /
          (Math.max(...data) - Math.min(...data))) *
          canvas.height,
    }));

    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });

    ctx.stroke();

    // Add gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, `${color}20`);
    gradient.addColorStop(1, `${color}00`);

    ctx.lineTo(points[points.length - 1].x, canvas.height);
    ctx.lineTo(points[0].x, canvas.height);
    ctx.fillStyle = gradient;
    ctx.fill();
  }, [data, color]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default SparklineChart;
