import { useState } from "react";
import { tradingAPI } from "../services/api";

export const useAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await tradingAPI.testConnection();
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getStrategies = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await tradingAPI.getStrategies();
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    testConnection,
    getStrategies,
  };
};
