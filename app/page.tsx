import WalletConnect from "../components/WalletConnect";
import CheckInCard from "../components/CheckInCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Base Builder Check-In
      </h1>

      <p className="text-gray-400 text-center max-w-md mb-8">
        Build your streak on Base. Check in daily, earn badges and climb the leaderboard.
      </p>

      <WalletConnect />

      <CheckInCard />
    </main>
  );
}