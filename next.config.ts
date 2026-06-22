import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/badges/1.json",
        destination: "/api/badges?id=1",
      },
      {
        source: "/api/badges/2.json",
        destination: "/api/badges?id=2",
      },
      {
        source: "/api/badges/3.json",
        destination: "/api/badges?id=3",
      },
    ];
  },
};

export default nextConfig;