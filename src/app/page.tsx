"use client";

import { Search, Wallet2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CreatorCard from "@/components/CreatorCard";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.175,
    },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        <header className="flex items-center justify-between py-6">
          <Link href="/" className="flex items-center space-x-3">
            <div className="rounded-xl bg-primary p-2 shadow-lg">
              <Wallet2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-primary dark:text-secondary">
              FillMyWallet
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
              <Input
                type="search"
                placeholder="Find creators to support..."
                className="pl-10 border-primary focus-visible:ringaccent"
              />
            </div>
          </div>
          <WalletMultiButton className="!bg-accent hover:!bg-accent/90 transition-colors !rounded-lg !py-2 !font-medium" />
        </header>

        <main className="relative min-h-3.5 flex flex-col mt-28 mb-12">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl text-center px-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
            >
              <h1 className="text-6xl font-bold tracking-tight sm:text-8xl text-primary dark:text-secondary pb-4">
                Your Wallet, Their Support
              </h1>
              <h2 className="text-3xl font-semibold mt-6 text-foreground">
                Empowering Creators through Crypto
              </h2>
            </motion.div>
            <p className="mt-8 text-xl text-muted-foreground max-w-2xl mx-auto">
              Create your profile, share your passion, and let your supporters
              fill your wallet with crypto. Innovative, secure, and seamless.
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-6">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-12 py-6 text-xl"
                asChild
              >
                <Link href="/create">Create Your Profile</Link>
              </Button>
              <Button
                variant="link"
                className="text-primary hover:text-primary/80 dark:text-secondary dark:hover:text-secondary/80"
              >
                Explore Creators
              </Button>
            </div>
          </motion.div>
        </main>

        <div className="container mx-auto px-4 py-20">
          <motion.div
            className="mb-32"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-center text-3xl font-bold text-foreground mb-12">
              Support Creators
            </h2>
            <motion.div
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
              variants={staggerChildren}
            >
              <motion.div variants={fadeInUp}>
                <CreatorCard
                  name="TechInnovator"
                  description="Pioneering blockchain solutions"
                  supporters={412}
                  href="/creator/techinnovator"
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <CreatorCard
                  name="CryptoArtist"
                  description="Merging art with blockchain technology"
                  supporters={289}
                  href="/creator/cryptoartist"
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <CreatorCard
                  name="Web3Educator"
                  description="Demystifying Web3 for everyone"
                  supporters={567}
                  href="/creator/web3educator"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.section
            className="text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-foreground mb-12">
              Why Choose FillMyWallet?
            </h2>
            <motion.div
              className="grid grid-cols-1 gap-8 sm:grid-cols-3"
              variants={staggerChildren}
            >
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="rounded-lg bg-card p-8 shadow-lg"
              >
                <div className="mb-4 inline-block rounded-lg bg-primary p-3">
                  <Wallet2 className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Instant Payments
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Receive support directly to your wallet in seconds
                </p>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="rounded-lg bg-card p-8 shadow-lg"
              >
                <div className="mb-4 inline-block rounded-lg bg-primary p-3">
                  <svg
                    className="h-6 w-6 text-primary-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-foreground">Low Fees</h3>
                <p className="mt-2 text-muted-foreground">
                  Keep more of what you earn with minimal transaction fees
                </p>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="rounded-lg bg-card p-8 shadow-lg"
              >
                <div className="mb-4 inline-block rounded-lg bg-primary p-3">
                  <svg
                    className="h-6 w-6 text-primary-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Global Reach
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Connect with supporters worldwide, instantly
                </p>
              </motion.div>
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
