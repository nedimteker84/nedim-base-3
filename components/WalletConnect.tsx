"use client";

import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function isFarcasterEnvironment() {
  if (typeof window === "undefined") return false;

  const url = window.location.href.toLowerCase();
  const referrer = document.referrer.toLowerCase();

  return (
    url.includes("farcaster") ||
    url.includes("warpcast") ||
    referrer.includes("farcaster") ||
    referrer.includes("warpcast")
  );
}

function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function WalletConnect() {
  const [mounted, setMounted] = useState(false);
  const [isMiniApp, setIsMiniApp] = useState(false);
  const [autoConnectTried, setAutoConnectTried] = useState(false);

  const { address, isConnected, connector } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    setMounted(true);
    setIsMiniApp(isFarcasterEnvironment());
  }, []);

  useEffect(() => {
    if (!mounted || !isMiniApp || isConnected || autoConnectTried) return;

    const farcasterConnector = connectors.find((item) =>
      item.id.toLowerCase().includes("farcaster")
    );

    if (farcasterConnector) {
      setAutoConnectTried(true);
      connect({ connector: farcasterConnector });
    }
  }, [mounted, isMiniApp, isConnected, autoConnectTried, connectors, connect]);

  useEffect(() => {
    if (!mounted || !isMiniApp || !isConnected || !connector) return;

    const isFarcasterConnector = connector.id
      .toLowerCase()
      .includes("farcaster");

    if (!isFarcasterConnector) {
      disconnect();
      setAutoConnectTried(false);
    }
  }, [mounted, isMiniApp, isConnected, connector, disconnect]);

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
          Connected: {shortAddress(address)}
        </p>

        {!isMiniApp && (
          <button
            onClick={() => disconnect()}
            className="rounded-xl bg-gray-800 px-6 py-3 font-semibold hover:bg-gray-700"
          >
            Disconnect
          </button>
        )}

        <p className="max-w-xs text-center text-xs text-gray-500">
          Builder Pulse only calls the check-in contract. It never asks for seed
          phrases or token approvals.
        </p>
      </div>
    );
  }

  if (isMiniApp) {
    return (
      <div className="flex flex-col items-center gap-3">
        <button
          disabled
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold opacity-50"
        >
          Connecting in-app wallet...
        </button>

        <p className="max-w-xs text-center text-xs text-gray-500">
          Farcaster will use your in-app wallet. Check-in still requires a Base
          transaction approval.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={() => {
          const injectedConnector =
            connectors.find((item) => item.id === "injected") || connectors[0];

          connect({ connector: injectedConnector });
        }}
        disabled={isPending}
        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "Connecting..." : "Connect Wallet"}
      </button>

      <p className="max-w-xs text-center text-xs text-gray-500">
        Web users connect a browser wallet. Farcaster uses the in-app wallet when
        supported.
      </p>
    </div>
  );
}