"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is FillMyWallet?",
    answer:
      "FillMyWallet is a web3 platform that allows creators to receive direct support from their audience using cryptocurrency. It's designed to be a decentralized alternative to traditional crowdfunding platforms.",
  },
  {
    question: "How do I create a profile?",
    answer:
      "To create a profile, click on the 'Create Your Profile' button on the homepage. You'll need to connect your wallet and provide some basic information about yourself and your work.",
  },
  {
    question: "What cryptocurrencies are supported?",
    answer:
      "Currently, FillMyWallet supports SOL (Solana) for transactions. We're working on adding support for more cryptocurrencies in the future.",
  },
  {
    question: "Are there any fees?",
    answer:
      "FillMyWallet takes a small percentage of each transaction to cover operational costs and continue improving the platform. The exact fee structure is available in our terms of service.",
  },
  {
    question: "How do I withdraw my funds?",
    answer:
      "Funds are sent directly to your connected wallet. You can then transfer them to an exchange or use them directly from your wallet.",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function FAQSection() {
  return (
    <motion.section
      className="py-20"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <h2 className="text-3xl font-bold text-center text-foreground mb-12">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.section>
  );
}
