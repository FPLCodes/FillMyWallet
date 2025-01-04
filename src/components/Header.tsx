"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-6">
      <Link href="/" className="flex items-center space-x-3">
        <Image src="/logo.png" alt="FillMyWallet" width={36} height={36} />
        <span className="text-2xl font-medium text-primary dark:text-secondary">
          FillMyWallet
        </span>
      </Link>
      <div className="flex items-center space-x-4">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
          <Input
            type="search"
            placeholder="Find creators to support..."
            className="pl-10 border-primary focus-visible:ring-0"
          />
        </div>
      </div>
      <WalletMultiButton className="!bg-accent hover:!bg-accent/90 transition-colors !rounded-lg !py-2 !font-medium" />
    </header>
  );
}
