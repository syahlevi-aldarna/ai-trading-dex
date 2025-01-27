import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const tradingAPI = {
  // Strategies
  getStrategies: () => api.get("/api/strategies"),
  getStrategy: (id: string) => api.get(`/api/strategies/${id}`),
  createStrategy: (data: any) => api.post("/api/strategies", data),

  // Test connection
  testConnection: () => api.get("/api/test"),
};

export default api;
