import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Web3Provider from "../providers/Web3Provider";

const appUrl = "https://nedim-base-3.vercel.app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Builder Pulse",
  description:
    "Check in daily on Base, track your builder streak, and climb the leaderboard.",
  other: {
    "base:app_id": "6a2d562c1fb8d6ce204da3ff",
  },
  openGraph: {
    title: "Builder Pulse",
    description:
      "Daily builder streaks on Base. Check in, build streaks, and stay visible.",
    url: appUrl,
    siteName: "Builder Pulse",
    images: [
      {
        url: `${appUrl}/hero.png`,
        width: 1200,
        height: 630,
        alt: "Builder Pulse",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Builder Pulse",
    description:
      "Daily builder streaks on Base. Check in, build streaks, and stay visible.",
    images: [`${appUrl}/hero.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}