"use client";

import Link from "next/link";
import { Wallet2 } from "lucide-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <header className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="rounded-xl bg-primary p-2">
                <Wallet2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-primary dark:text-secondary">
                FillMyWallet
              </span>
            </Link>
            <WalletMultiButton />
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
