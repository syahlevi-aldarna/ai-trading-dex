interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    selectedAddress?: string;
    request: (args: { method: string; params?: any[] }) => Promise<any>;
  };
}
