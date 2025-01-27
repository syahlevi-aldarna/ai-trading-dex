import { useState } from "react";
import useWeb3Auth from "../hooks/useWeb3Auth";
import { Menu } from "@headlessui/react";

const Navbar = () => {
  const { connect, disconnect, address, isConnected } = useWeb3Auth();
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#151C2F] border-b border-blue-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                AI Trading DEX
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <a
                href="#"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Strategies
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Learn
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon */}
              <svg
                className="h-6 w-6"
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
          </div>

          {/* Connect Wallet Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={isConnected ? disconnect : connect}
              disabled={isLoading}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                isConnected
                  ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              } ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
            >
              {isLoading
                ? "Connecting..."
                : isConnected
                ? `${address.slice(0, 6)}...${address.slice(-4)}`
                : "Connect Wallet"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Strategies
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Learn
            </a>
            <button
              onClick={isConnected ? disconnect : connect}
              disabled={isLoading}
              className="w-full text-left text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              {isLoading
                ? "Connecting..."
                : isConnected
                ? `${address.slice(0, 6)}...${address.slice(-4)}`
                : "Connect Wallet"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
