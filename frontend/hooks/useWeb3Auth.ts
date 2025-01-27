import { useState, useEffect } from "react";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

const useWeb3Auth = () => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  const [address, setAddress] = useState<string>("");
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId: process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID!,
          web3AuthNetwork: "sapphire_devnet",
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0xaa36a7",
            rpcTarget: process.env.NEXT_PUBLIC_RPC_URL,
            displayName: "Sepolia Testnet",
            ticker: "ETH",
            tickerName: "Ethereum",
          },
        });

        const openloginAdapter = new OpenloginAdapter({
          adapterSettings: {
            network: "testnet",
            uxMode: "popup",
          },
        });

        web3auth.configureAdapter(openloginAdapter);
        await web3auth.initModal();
        setWeb3auth(web3auth);

        // Check if MetaMask is already connected
        if (window.ethereum && window.ethereum.selectedAddress) {
          setAddress(window.ethereum.selectedAddress);
          setIsConnected(true);
        }
      } catch (error) {
        console.error("Failed to initialize Web3Auth:", error);
      }
    };

    init();
  }, []);

  const connectMetaMask = async () => {
    setIsLoading(true);
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask not installed");
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts && accounts.length > 0) {
        setAddress(accounts[0]);
        setIsConnected(true);
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const connect = async () => {
    if (window.ethereum) {
      return connectMetaMask();
    }

    if (!web3auth) {
      throw new Error("Web3Auth not initialized");
    }

    setIsLoading(true);
    try {
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);
      if (web3authProvider) {
        const accounts = await web3authProvider.request({
          method: "eth_accounts",
        });
        if (Array.isArray(accounts) && accounts.length > 0) {
          setAddress(accounts[0]);
          setIsConnected(true);
        }
      }
    } catch (error) {
      console.error("Error connecting:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = async () => {
    if (window.ethereum) {
      setAddress("");
      setIsConnected(false);
      return;
    }

    if (!web3auth) {
      throw new Error("Web3Auth not initialized");
    }
    try {
      await web3auth.logout();
      setProvider(null);
      setAddress("");
      setIsConnected(false);
    } catch (error) {
      console.error("Error disconnecting:", error);
    }
  };

  return {
    web3auth,
    provider,
    address,
    isConnected,
    isLoading,
    connect,
    disconnect,
  };
};

export default useWeb3Auth;
