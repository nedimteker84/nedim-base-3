import { NextResponse } from "next/server";

export async function GET() {
  const appUrl = "https://nedim-base-3.vercel.app";

  return NextResponse.json({
    accountAssociation: {
      header: "",
      payload: "",
      signature: "",
    },

    frame: {
      version: "1",
      name: "Builder Pulse",
      subtitle: "Daily builder streaks on Base",
      description:
        "Check in daily on Base, track your builder streak, and climb the leaderboard.",
      iconUrl: `${appUrl}/favicon.ico`,
      homeUrl: appUrl,
      imageUrl: `${appUrl}/favicon.ico`,
      buttonTitle: "Open Builder Pulse",
      splashImageUrl: `${appUrl}/favicon.ico`,
      splashBackgroundColor: "#000000",
    },
  });
}