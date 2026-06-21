"use client";

import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function WalletConnect() {
  const [mounted, setMounted] = useState(false);
  const [autoConnectTried, setAutoConnectTried] = useState(false);

  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isConnected || autoConnectTried) return;

    const farcasterConnector = connectors.find((connector) =>
      connector.id.toLowerCase().includes("farcaster")
    );

    if (farcasterConnector) {
      setAutoConnectTried(true);
      connect({ connector: farcasterConnector });
    }
  }, [mounted, isConnected, autoConnectTried, connectors, connect]);

  if (!mounted) {
    return (
      <button
        disabled
        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold opacity-50"
      >
        Loading wallet...
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
          className="rounded-xl bg-gray-800 px-6 py-3 font-semibold hover:bg-gray-700"
        >
          Disconnect
        </button>

        <p className="max-w-xs text-center text-xs text-gray-500">
          Builder Pulse only calls the check-in contract. It never asks for seed phrases or token approvals.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={() => {
          const injectedConnector =
            connectors.find((connector) => connector.id === "injected") ||
            connectors[0];

          connect({ connector: injectedConnector });
        }}
        disabled={isPending}
        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "Connecting..." : "Connect Wallet"}
      </button>

      <p className="max-w-xs text-center text-xs text-gray-500">
        On Farcaster and Base App, Builder Pulse uses the available in-app wallet when supported.
      </p>
    </div>
  );
}