import { NextResponse } from "next/server";

const appUrl = "https://nedim-base-3.vercel.app";

const badges: Record<
  string,
  {
    name: string;
    description: string;
    streak: string;
  }
> = {
  "1": {
    name: "Bronze Builder",
    description:
      "Awarded to Builder Pulse users who reach a 7 day builder streak.",
    streak: "7 Days",
  },

  "2": {
    name: "Silver Builder",
    description:
      "Awarded to Builder Pulse users who reach a 30 day builder streak.",
    streak: "30 Days",
  },

  "3": {
    name: "Gold Builder",
    description:
      "Awarded to Builder Pulse users who reach a 100 day builder streak.",
    streak: "100 Days",
  },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id") || "1";

  const badge = badges[id];

  if (!badge) {
    return NextResponse.json(
      { error: "Badge not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    name: badge.name,
    description: badge.description,
    image: `${appUrl}/icon.png`,
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