import WalletConnect from "../components/WalletConnect";
import CheckInCard from "../components/CheckInCard";
import LeaderboardCard from "../components/LeaderboardCard";
import BaseDashboard from "../components/BaseDashboard";
import BadgeCard from "../components/BadgeCard";
import FarcasterReady from "../components/FarcasterReady";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-12">
      <FarcasterReady />

      <section className="flex w-full max-w-sm flex-col items-center text-center">
        <p className="mb-3 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-300">
          Built on Base
        </p>

        <h1 className="text-4xl font-bold mb-4">
          Builder Pulse
        </h1>

        <p className="text-gray-400 mb-8">
          Daily builder streaks on Base. Check in daily, track progress and climb the leaderboard.
        </p>

        <WalletConnect />

        <CheckInCard />

        <LeaderboardCard />

        <BadgeCard />

        <BaseDashboard />
      </section>
    </main>
  );
}