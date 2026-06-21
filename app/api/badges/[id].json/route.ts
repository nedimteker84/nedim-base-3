import { NextResponse } from "next/server";

const appUrl = "https://nedim-base-3.vercel.app";

const badges: Record<
  string,
  {
    name: string;
    description: string;
    image: string;
    streak: string;
  }
> = {
  "1": {
    name: "Bronze Builder",
    description:
      "Awarded to Builder Pulse users who reach a 7 day onchain builder streak on Base.",
    image: `${appUrl}/icon.png`,
    streak: "7 days",
  },
  "2": {
    name: "Silver Builder",
    description:
      "Awarded to Builder Pulse users who reach a 30 day onchain builder streak on Base.",
    image: `${appUrl}/icon.png`,
    streak: "30 days",
  },
  "3": {
    name: "Gold Builder",
    description:
      "Awarded to Builder Pulse users who reach a 100 day onchain builder streak on Base.",
    image: `${appUrl}/icon.png`,
    streak: "100 days",
  },
};

export async function GET(request: Request, context: any) {
  const id = context.params.id;
  const badge = badges[id];

  if (!badge) {
    return NextResponse.json({ error: "Badge not found" }, { status: 404 });
  }

  return NextResponse.json({
    name: badge.name,
    description: badge.description,
    image: badge.image,
    attributes: [
      {
        trait_type: "App",
        value: "Builder Pulse",
      },
      {
        trait_type: "Network",
        value: "Base",
      },
      {
        trait_type: "Type",
        value: "Soulbound ERC1155",
      },
      {
        trait_type: "Required Streak",
        value: badge.streak,
      },
    ],
  });
}