"use client";

import { useEffect, useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import {
  DAILY_CHECKIN_CONTRACT,
  dailyCheckInAbi,
} from "../lib/contract";

const ONE_DAY = 86400;

function hasCheckedInToday(lastCheckIn: number) {
  if (!lastCheckIn) return false;

  const todayUtc = Math.floor(Date.now() / 1000 / ONE_DAY);
  const lastCheckInDayUtc = Math.floor(lastCheckIn / ONE_DAY);

  return todayUtc === lastCheckInDayUtc;
}

export default function CheckInCard() {
  const [mounted, setMounted] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    data: stats,
    refetch,
    isLoading,
  } = useReadContract({
    address: DAILY_CHECKIN_CONTRACT,
    abi: dailyCheckInAbi,
    functionName: "getStats",
    args: address ? [address] : undefined,
    query: {
      enabled: mounted && Boolean(address),
    },
  });

  const { writeContract, isPending } = useWriteContract();

  if (!mounted) {
    return (
      <div className="mt-8 w-full max-w-sm rounded-2xl border border-gray-800 bg-gray-950 p-5 text-center">
        <p className="text-gray-500">Loading check-in status...</p>
      </div>
    );
  }

  const streak = stats ? Number(stats[0]) : 0;
  const lastCheckIn = stats ? Number(stats[1]) : 0;
  const totalCheckIns = stats ? Number(stats[2]) : 0;
  const checkedToday = hasCheckedInToday(lastCheckIn);

  function handleCheckIn() {
    if (checkedToday) return;

    writeContract(
      {
        address: DAILY_CHECKIN_CONTRACT,
        abi: dailyCheckInAbi,
        functionName: "checkIn",
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

  if (!isConnected) {
    return (
      <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-950 p-5 text-center max-w-sm">
        <p className="text-gray-400">
          Connect your wallet to start your daily Base builder streak.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 w-full max-w-sm rounded-2xl border border-gray-800 bg-gray-950 p-5 text-center">
      <p className="text-sm text-gray-400 mb-2">Your current streak</p>

      <div className="text-5xl font-bold mb-2">
        {isLoading ? "..." : streak}
      </div>

      <p className="text-sm text-gray-500 mb-6">
        Total check-ins: {totalCheckIns}
      </p>

      <button
        onClick={handleCheckIn}
        disabled={isPending || checkedToday}
        className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending
          ? "Checking in..."
          : checkedToday
            ? "Checked In Today"
            : "Daily Check-In"}
      </button>

      <p className="mt-4 text-xs text-gray-500">
        One check-in per wallet per UTC day.
      </p>
    </div>
  );
}