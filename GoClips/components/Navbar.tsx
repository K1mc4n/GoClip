"use client";
import { Wallet } from "@coinbase/onchainkit/wallet";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-800 bg-gray-900">
      <h1 className="text-xl font-bold text-white">GoClips</h1>
      <Wallet />
    </nav>
  );
}
