import { DAILY_CHECKIN_CONTRACT } from "../lib/contract";

export default function BaseDashboard() {
  return (
    <section className="mt-6 w-full max-w-sm rounded-2xl border border-gray-800 bg-gray-950 p-5">
      <div className="mb-4 text-center">
        <p className="text-sm text-gray-400">Base Dashboard</p>
        <h2 className="text-xl font-bold">Network & App Status</h2>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-xl bg-black px-4 py-3">
          <span className="text-sm text-gray-400">Network</span>
          <span className="text-sm font-semibold">Base Mainnet</span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-black px-4 py-3">
          <span className="text-sm text-gray-400">Chain ID</span>
          <span className="text-sm font-semibold">8453</span>
        </div>

        <div className="rounded-xl bg-black px-4 py-3">
          <p className="mb-1 text-sm text-gray-400">Check-In Contract</p>
          <p className="break-all text-xs font-semibold text-blue-300">
            {DAILY_CHECKIN_CONTRACT}
          </p>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-black px-4 py-3">
          <span className="text-sm text-gray-400">Daily Reset</span>
          <span className="text-sm font-semibold">00:00 UTC</span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-black px-4 py-3">
          <span className="text-sm text-gray-400">App Status</span>
          <span className="text-sm font-semibold text-green-400">Live MVP</span>
        </div>
      </div>
    </section>
  );
}