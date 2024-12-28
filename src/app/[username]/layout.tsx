"use client";

import Link from "next/link";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-b from-background to-muted relative">
      {/* Header */}
      <header className="bg-primary/30 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logo.png" alt="Logo" width={32} height={32} />
              <span className="text-xl font-bold text-primary dark:text-secondary">
                FillMyWallet
              </span>
            </Link>
            <WalletMultiButton />
          </div>
        </div>
      </header>

      {/* Children */}
      <div className="-mt-16">{children}</div>
    </div>
  );
}
