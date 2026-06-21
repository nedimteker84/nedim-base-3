export const DAILY_CHECKIN_CONTRACT =
  "0xCaaD6d9b2C73a9f30cDd79aC85AEb7f423cD04D2" as const;

export const BUILDER_PULSE_BADGES_CONTRACT =
  "0xb7D2Faf929A41d00F2DBdf3045a272A77D6b0Bfa" as const;

export const dailyCheckInAbi = [
  {
    inputs: [],
    name: "checkIn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "getStats",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "users",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const builderPulseBadgesAbi = [
  {
    inputs: [{ internalType: "uint256", name: "badgeId", type: "uint256" }],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "claimed",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
] as const;