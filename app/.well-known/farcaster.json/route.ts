import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    accountAssociation: {
      header: "",
      payload: "",
      signature: "",
    },

    frame: {
      version: "1",
      name: "Base Builder Check-In",
      iconUrl: "https://placehold.co/512x512/png",
      homeUrl: "https://example.com",
      imageUrl: "https://placehold.co/1200x630/png",
      buttonTitle: "Open App",
      splashImageUrl: "https://placehold.co/200x200/png",
      splashBackgroundColor: "#000000",
    },
  });
}