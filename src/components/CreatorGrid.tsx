"use client";

import { motion } from "framer-motion";
import CreatorCard from "@/components/CreatorCard";

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

export default function CreatorGrid() {
  return (
    <motion.div
      className="mb-24"
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
            name="FPLCodes"
            description="Creator of FillMyWallet"
            supporters={1}
            href="/FPLCodes"
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <CreatorCard
            name="imposter"
            description="There's an imposter among us"
            supporters={2}
            href="/imposter"
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
  );
}
