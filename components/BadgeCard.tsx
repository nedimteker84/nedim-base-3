"use client";

import { useEffect, useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import {
  BUILDER_PULSE_BADGES_CONTRACT,
  DAILY_CHECKIN_CONTRACT,
  builderPulseBadgesAbi,
  dailyCheckInAbi,
} from "../lib/contract";

const badges = [
  {
    id: 1,
    name: "Bronze Builder",
    streak: 1,
    icon: "🥉",
  },
  {
    id: 2,
    name: "Silver Builder",
    streak: 30,
    icon: "🥈",
  },
  {
    id: 3,
    name: "Gold Builder",
    streak: 100,
    icon: "🥇",
  },
];

function BadgeRow({
  badge,
  userStreak,
  address,
}: {
  badge: {
    id: number;
    name: string;
    streak: number;
    icon: string;
  };
  userStreak: number;
  address: `0x${string}` | undefined;
}) {
  const { writeContract, isPending } = useWriteContract();

  const {
    data: alreadyClaimed,
    refetch,
    isLoading,
  } = useReadContract({
    address: BUILDER_PULSE_BADGES_CONTRACT,
    abi: builderPulseBadgesAbi,
    functionName: "claimed",
    args: address ? [address, BigInt(badge.id)] : undefined,
    query: {
      enabled: Boolean(address),
    },
  });

  const canClaim = userStreak >= badge.streak && !alreadyClaimed;

  function handleClaim() {
    if (!canClaim) return;

    writeContract(
      {
        address: BUILDER_PULSE_BADGES_CONTRACT,
        abi: builderPulseBadgesAbi,
        functionName: "claim",
        args: [BigInt(badge.id)],
      },
      {
        onSuccess: () => {
          setTimeout(() => {
            refetch();
          }, 3000);
        },
      }
    );
  }

  return (
    <div className="flex items-center justify-between rounded-xl bg-black px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="text-xl">{badge.icon}</span>

        <div>
          <p className="text-sm font-semibold">{badge.name}</p>
          <p className="text-xs text-gray-500">
            Unlocks at {badge.streak} day streak
          </p>
        </div>
      </div>

      {alreadyClaimed ? (
        <span className="rounded-full border border-green-500/30 bg-green-500/10 px-2 py-1 text-xs text-green-300">
          Claimed
        </span>
      ) : (
        <button
          onClick={handleClaim}
          disabled={!canClaim || isPending || isLoading}
          className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Claiming..." : canClaim ? "Claim" : "Locked"}
        </button>
      )}
    </div>
  );
}

export default function BadgeCard() {
  const [mounted, setMounted] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: stats } = useReadContract({
    address: DAILY_CHECKIN_CONTRACT,
    abi: dailyCheckInAbi,
    functionName: "getStats",
    args: address ? [address] : undefined,
    query: {
      enabled: mounted && Boolean(address),
    },
  });

  const userStreak = stats ? Number(stats[0]) : 0;

  return (
    <section className="mt-6 w-full max-w-sm rounded-2xl border border-gray-800 bg-gray-950 p-5">
      <div className="mb-4 text-center">
        <p className="text-sm text-gray-400">NFT Badges</p>
        <h2 className="text-xl font-bold">Builder Rewards</h2>
      </div>

      <div className="space-y-3">
        {badges.map((badge) => (
          <BadgeRow
            key={badge.id}
            badge={badge}
            userStreak={userStreak}
            address={address}
          />
        ))}
      </div>

      {!isConnected ? (
        <p className="mt-4 text-center text-xs text-gray-500">
          Connect your wallet to view and claim Builder Pulse badges.
        </p>
      ) : (
        <p className="mt-4 text-center text-xs text-gray-500">
          Badges are soulbound ERC1155 NFTs on Base. They cannot be transferred.
        </p>
      )}
    </section>
  );
}