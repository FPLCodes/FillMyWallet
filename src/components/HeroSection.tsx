"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <main className="relative min-h-3.5 flex flex-col mt-28 mb-36">
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
          <h1 className="text-6xl font-bold tracking-tight sm:text-8xl dark:text-secondary pb-4">
            Your Wallet, Their Support
          </h1>
          <h2 className="text-3xl font-semibold mt-6 text-foreground">
            Empowering Creators through Crypto
          </h2>
        </motion.div>
        <p className="mt-8 text-xl text-muted-foreground max-w-2xl mx-auto">
          Create your profile, share your passion, and let your supporters fill
          your wallet.
        </p>
        <div className="mt-12 flex flex-col items-center justify-center gap-6">
          <Button
            size="lg"
            className="bg-primary border-0 rounded-full transition-all hover:bg-primary/90 hover:scale-105 text-primary-foreground px-12 py-8 text-xl"
            asChild
          >
            <Link href="/create">Create Your Profile</Link>
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
