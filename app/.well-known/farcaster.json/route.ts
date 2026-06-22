import { NextResponse } from "next/server";

export async function GET() {
  const appUrl = "https://nedim-base-3.vercel.app";

  return NextResponse.json({
    accountAssociation: {
      header:
        "eyJmaWQiOjc2OTM2OCwidHlwZSI6ImF1dGgiLCJrZXkiOiIweEU5MWM5RWNiODkzOGE2RDc4Njg5MjM0NTEyN0YzOTJBQmMwRTdjNTIifQ",
      payload: "eyJkb21haW4iOiJuZWRpbS1iYXNlLTMudmVyY2VsLmFwcCJ9",
      signature:
        "jjk/LnECYOLCXZ6I1hUxdoy9ja46aNyPDppkY9zrY3hyVlAlyqQj7v5v0WFhteeHyw7tzcvEUDRIqIyTTJSVohs=",
    },

    frame: {
      version: "1",
      name: "Builder Pulse",
      subtitle: "Daily builder streaks on Base",
      description:
        "Check in daily on Base, track your builder streak, earn soulbound badges, and climb the leaderboard.",
      iconUrl: `${appUrl}/icon.png`,
      homeUrl: appUrl,
      imageUrl: `${appUrl}/hero.png`,
      buttonTitle: "Open Builder Pulse",
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#000000",
      primaryCategory: "utility",
      tags: ["base", "builder", "streaks"],
      tagline: "Daily builder streaks on Base",
      heroImageUrl: `${appUrl}/hero.png`,
      ogTitle: "Builder Pulse",
      ogDescription:
        "Daily Base check-ins, builder streaks, leaderboard rankings, and soulbound NFT badges.",
      ogImageUrl: `${appUrl}/hero.png`,
      castShareUrl:
        "https://warpcast.com/~/compose?text=I%20am%20building%20my%20daily%20Base%20streak%20on%20Builder%20Pulse&embeds[]=https%3A%2F%2Fnedim-base-3.vercel.app",
      screenshotUrls: [
        `${appUrl}/hero.png`,
        `${appUrl}/splash.png`,
      ],
    },
  });
}