"use client";

import { useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

export default function FarcasterReady() {
  useEffect(() => {
    async function init() {
      try {
        await sdk.actions.ready();
      } catch {
        console.log("Not running inside Farcaster");
      }
    }

    init();
  }, []);

  return null;
}