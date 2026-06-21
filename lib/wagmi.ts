import { createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { farcasterMiniApp } from "@farcaster/miniapp-wagmi-connector";

export const config = createConfig({
  chains: [base],

  connectors: [
    farcasterMiniApp(),
    injected(),
  ],

  transports: {
    [base.id]: http(),
  },
});