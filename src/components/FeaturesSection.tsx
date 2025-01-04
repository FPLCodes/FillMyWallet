"use client";

import { motion } from "framer-motion";
import { Wallet2 } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function FeaturesSection() {
  return (
    <motion.section
      className="text-center mb-12"
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
          <h3 className="text-xl font-bold text-foreground">Global Reach</h3>
          <p className="mt-2 text-muted-foreground">
            Connect with supporters worldwide, instantly
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
