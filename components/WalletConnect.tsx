"use client";

import { useEffect, useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function WalletConnect() {
  const [mounted, setMounted] = useState(false);
  const [isMiniApp, setIsMiniApp] = useState(false);
  const [connectTried, setConnectTried] = useState(false);

  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    async function init() {
      setMounted(true);

      try {
        const context = await sdk.context;
        setIsMiniApp(Boolean(context));
      } catch {
        setIsMiniApp(false);
      }
    }

    init();
  }, []);

  useEffect(() => {
    if (!mounted || !isMiniApp || isConnected || connectTried) return;

    const farcasterConnector = connectors.find((item) =>
      item.id.toLowerCase().includes("farcaster")
    );

    if (!farcasterConnector) return;

    setConnectTried(true);
    connect({ connector: farcasterConnector });
  }, [mounted, isMiniApp, isConnected, connectTried, connectors, connect]);

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
          onClick={() => {
            const farcasterConnector = connectors.find((item) =>
              item.id.toLowerCase().includes("farcaster")
            );

            if (farcasterConnector) {
              connect({ connector: farcasterConnector });
            }
          }}
          disabled={isPending}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? "Connecting..." : "Connect Farcaster Wallet"}
        </button>

        <p className="max-w-xs text-center text-xs text-gray-500">
          Farcaster uses the in-app wallet when supported. Check-in still
          requires a Base transaction approval.
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