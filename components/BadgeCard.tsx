"use client";

const badges = [
  {
    name: "Bronze Builder",
    streak: 7,
    icon: "🥉",
    status: "Coming soon",
  },
  {
    name: "Silver Builder",
    streak: 30,
    icon: "🥈",
    status: "Coming soon",
  },
  {
    name: "Gold Builder",
    streak: 100,
    icon: "🥇",
    status: "Coming soon",
  },
];

export default function BadgeCard() {
  return (
    <section className="mt-6 w-full max-w-sm rounded-2xl border border-gray-800 bg-gray-950 p-5">
      <div className="mb-4 text-center">
        <p className="text-sm text-gray-400">NFT Badges</p>
        <h2 className="text-xl font-bold">Builder Rewards</h2>
      </div>

      <div className="space-y-3">
        {badges.map((badge) => (
          <div
            key={badge.name}
            className="flex items-center justify-between rounded-xl bg-black px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{badge.icon}</span>

              <div>
                <p className="text-sm font-semibold">{badge.name}</p>
                <p className="text-xs text-gray-500">
                  Unlocks at {badge.streak} day streak
                </p>
              </div>
            </div>

            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-1 text-xs text-blue-300">
              {badge.status}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-gray-500">
        Badge minting will be added after the NFT contract is deployed on Base.
      </p>
    </section>
  );
}