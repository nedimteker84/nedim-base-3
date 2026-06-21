"use client";

import { useEffect, useState } from "react";
import { readContract } from "wagmi/actions";
import { config } from "../lib/wagmi";
import {
  DAILY_CHECKIN_CONTRACT,
  dailyCheckInAbi,
} from "../lib/contract";

type LeaderboardUser = {
  address: string;
  streak: number;
  totalCheckIns: number;
};

const MAX_USERS_TO_SCAN = 20;

function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function LeaderboardCard() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const loadedUsers: LeaderboardUser[] = [];

        for (let i = 0; i < MAX_USERS_TO_SCAN; i++) {
          try {
            const userAddress = await readContract(config, {
              address: DAILY_CHECKIN_CONTRACT,
              abi: dailyCheckInAbi,
              functionName: "users",
              args: [BigInt(i)],
            });

            const stats = await readContract(config, {
              address: DAILY_CHECKIN_CONTRACT,
              abi: dailyCheckInAbi,
              functionName: "getStats",
              args: [userAddress],
            });

            loadedUsers.push({
              address: userAddress,
              streak: Number(stats[0]),
              totalCheckIns: Number(stats[2]),
            });
          } catch {
            break;
          }
        }

        loadedUsers.sort((a, b) => {
          if (b.streak !== a.streak) return b.streak - a.streak;
          return b.totalCheckIns - a.totalCheckIns;
        });

        setUsers(loadedUsers);
      } finally {
        setIsLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <section className="mt-6 w-full max-w-sm rounded-2xl border border-gray-800 bg-gray-950 p-5">
      <div className="mb-4 text-center">
        <p className="text-sm text-gray-400">Leaderboard</p>
        <h2 className="text-xl font-bold">Top Base Builders</h2>
      </div>

      {isLoading ? (
        <p className="text-center text-sm text-gray-500">Loading leaderboard...</p>
      ) : users.length === 0 ? (
        <p className="text-center text-sm text-gray-500">
          No builders found yet.
        </p>
      ) : (
        <div className="space-y-3">
          {users.map((user, index) => (
            <div
              key={user.address}
              className="flex items-center justify-between rounded-xl bg-black px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold">
                  #{index + 1} {shortAddress(user.address)}
                </p>
                <p className="text-xs text-gray-500">
                  Total check-ins: {user.totalCheckIns}
                </p>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold">{user.streak}</p>
                <p className="text-xs text-gray-500">streak</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}