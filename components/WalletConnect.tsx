"use client";

import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

export default function WalletConnect() {
  const [mounted, setMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const { connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        disabled
        className="bg-blue-600 px-6 py-3 rounded-xl font-semibold opacity-50"
      >
        Connect Wallet
      </button>
    );
  }

  if (isConnected && address) {
    return (
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm text-gray-400">
          Connected: {address.slice(0, 6)}...{address.slice(-4)}
        </p>

        <button
          onClick={() => disconnect()}
          className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-xl font-semibold"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: injected() })}
      disabled={isPending}
      className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-6 py-3 rounded-xl font-semibold"
    >
      {isPending ? "Connecting..." : "Connect Wallet"}
    </button>
  );
}