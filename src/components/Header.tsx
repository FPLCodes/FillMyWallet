"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";
import { useSearchUsers } from "@/hooks/useSearchUsers";
import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "@/components/ui/button";
import { getUsernameFromWallet } from "@/lib/serverActions";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const { searchResults, isSearching, searchUsers, selectUser } =
    useSearchUsers();
  const { connected, publicKey } = useWallet();
  const [username, setUsername] = useState<string | null>(null);

  // Fetch the username associated with the wallet address
  useEffect(() => {
    const fetchUsername = async () => {
      if (publicKey) {
        const result = await getUsernameFromWallet(publicKey.toBase58());
        setUsername(result);
      }
    };

    if (connected) {
      fetchUsername();
    } else {
      setUsername(null);
    }
  }, [connected, publicKey]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim()) {
      searchUsers(value);
    }
  };

  return (
    <header className="flex items-center justify-between py-6">
      <Link href="/" className="flex items-center space-x-3">
        <Image src="/logo.png" alt="FillMyWallet" width={36} height={36} />
        <span className="text-2xl font-medium text-primary dark:text-secondary">
          FillMyWallet
        </span>
      </Link>
      <div className="relative w-96">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
          <Input
            type="search"
            placeholder="Find creators to support..."
            className="pl-10 border-primary focus-visible:ring-0"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        {searchTerm.trim() && searchResults.length > 0 && (
          <ul className="absolute z-10 bg-card w-full mt-2 rounded-lg shadow-lg border border-muted max-h-48 overflow-y-auto">
            {searchResults.map((username) => (
              <li
                key={username}
                className="px-4 py-2 cursor-pointer transition-colors hover:text-primary"
                onClick={() => selectUser(username)}
              >
                {username}
              </li>
            ))}
          </ul>
        )}
        {searchTerm.trim() && !isSearching && searchResults.length === 0 && (
          <div className="absolute z-10 bg-card w-full mt-2 rounded-lg shadow-lg border border-muted p-4 text-center text-muted-foreground">
            No results found
          </div>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {connected && username && (
          <Button variant="secondary" className="rounded-lg" asChild>
            <Link href={`/${username}`}>My Profile</Link>
          </Button>
        )}
        <WalletMultiButton className="!bg-accent hover:!bg-accent/90 transition-colors !rounded-lg !py-2 !font-medium" />
      </div>
    </header>
  );
}
