import React from "react";

const HonshuLogo = ({ size = 30 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="32" height="32" rx="8" fill="#1a2e1a" />
    <path
      d="M8 10 L8 22 M8 16 L16 16 M16 10 L16 22"
      stroke="#4ade80"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 14 C20 12 22 10 24 10 C24 14 22 16 19 16"
      stroke="#4ade80"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="22" cy="20" r="2.5" fill="#22c55e" opacity="0.8" />
  </svg>
);

export default HonshuLogo;
