"use client";

import { Search } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CreatorCard from "@/components/CreatorCard";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Home() {
  return (
    <div className="min-h-screen container mx-auto px-4">
      <header className="flex items-center justify-between py-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="rounded-full bg-primary p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary-foreground"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
          <span className="text-xl font-bold">CryptoSupport</span>
        </Link>
        <div className="flex items-center space-x-4">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search creators..."
              className="pl-10"
            />
          </div>
        </div>
        <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 transition-colors" />
      </header>

      <main className="relative py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Support Creators with Crypto
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            The easiest way to support your favorite creators with
            cryptocurrency. Connect your wallet, find creators, and show your
            appreciation with crypto tips.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/create">Create Your Profile</Link>
            </Button>
            <Button size="lg" variant="outline">
              Explore Creators
            </Button>
          </div>
        </motion.div>

        <div className="mt-32">
          <h2 className="text-center text-3xl font-bold">Featured Creators</h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <CreatorCard
              name="CryptoArtist"
              description="Digital artist creating NFT collections"
              supporters={156}
              href="/creator/cryptoartist"
            />
            <CreatorCard
              name="Web3Dev"
              description="Building the future of decentralized apps"
              supporters={243}
              href="/creator/web3dev"
            />
            <CreatorCard
              name="CryptoTeacher"
              description="Educational content about blockchain"
              supporters={89}
              href="/creator/cryptoteacher"
            />
          </div>
        </div>

        <section className="mt-32 text-center">
          <h2 className="text-3xl font-bold">Why Choose CryptoSupport?</h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-lg bg-card p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold">Decentralized</h3>
              <p className="mt-2 text-muted-foreground">
                Direct peer-to-peer transactions with no middleman
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-lg bg-card p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold">Low Fees</h3>
              <p className="mt-2 text-muted-foreground">
                Minimal transaction fees compared to traditional platforms
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-lg bg-card p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold">Global</h3>
              <p className="mt-2 text-muted-foreground">
                Support creators from anywhere in the world
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
