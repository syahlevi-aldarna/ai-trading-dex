import create from 'zustand';
import { ethers } from 'ethers';
import { MARKETPLACE_ABI } from '../constants/abis';
import { MARKETPLACE_ADDRESS } from '../constants/addresses';

interface TradingStore {
  strategies: any[];
  performance: any;
  loading: boolean;
  error: string | null;
  loadStrategies: () => Promise<void>;
  purchaseStrategy: (strategyId: number, price: string) => Promise<void>;
  rateStrategy: (strategyId: number, rating: number) => Promise<void>;
}

export const useTrading = create<TradingStore>((set, get) => ({
  strategies: [],
  performance: null,
  loading: false,
  error: null,

  loadStrategies: async () => {
    try {
      set({ loading: true });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        MARKETPLACE_ADDRESS,
        MARKETPLACE_ABI,
        provider
      );

      const strategies = await contract.getStrategies();
      set({ strategies, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  purchaseStrategy: async (strategyId: number, price: string) => {
    try {
      set({ loading: true });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        MARKETPLACE_ADDRESS,
        MARKETPLACE_ABI,
        signer
      );

      const tx = await contract.purchaseStrategy(strategyId, {
        value: ethers.utils.parseEther(price)
      });
      await tx.wait();

      await get().loadStrategies();
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  rateStrategy: async (strategyId: number, rating: number) => {
    try {
      set({ loading: true });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        MARKETPLACE_ADDRESS,
        MARKETPLACE_ABI,
        signer
      );

      const tx = await contract.rateStrategy(strategyId, rating);
      await tx.wait();

      await get().loadStrategies();
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
})); 