"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Wallet2, ArrowRight, Check, ArrowLeft } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const formSchema = z.object({
  username: z.string().min(3).max(50),
  bio: z.string().max(160).optional(),
});

export default function CreateProfile() {
  const [step, setStep] = useState(1);
  const { connected, publicKey } = useWallet();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (connected && publicKey) {
      // This is where you would check if the user already has an account
      // For now, we'll just log the public key
      console.log("Connected wallet:", publicKey.toBase58());

      // TODO: Implement check with backend
      // If user exists, redirect to dashboard
      // Example:
      // checkUserExists(publicKey.toBase58()).then(exists => {
      //   if (exists) router.push('/dashboard')
      // })
    }
  }, [connected, publicKey, router]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setStep(3);
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex flex-col items-center justify-center p-4">
      <Link href="/" className="flex items-center space-x-3 mb-8">
        <div className="rounded-xl bg-primary p-2 shadow-lg">
          <Wallet2 className="h-6 w-6 text-primary-foreground" />
        </div>
        <span className="text-2xl font-bold text-primary dark:text-secondary">
          FillMyWallet
        </span>
      </Link>

      <motion.div
        className="w-full max-w-md bg-card p-8 rounded-lg shadow-lg relative"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        {step === 2 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 hover:bg-transparent hover:text-primary"
            onClick={() => setStep(1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}

        <h1 className="text-3xl font-bold text-center mb-6 text-foreground">
          Create Your Profile
        </h1>

        {step === 1 && (
          <motion.div variants={fadeInUp}>
            <p className="text-center text-muted-foreground mb-6">
              First, connect your wallet to get started.
            </p>
            <div className="flex justify-center mb-6">
              <WalletMultiButton className="!bg-accent hover:!bg-accent/90 transition-colors !rounded-lg !py-2 !px-4 !font-medium" />
            </div>
            <Button
              className="w-full"
              onClick={() => setStep(2)}
              disabled={!connected}
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div variants={fadeInUp}>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="your-awesome-name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This will be your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell your supporters about yourself"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Keep it short and sweet. Max 160 characters.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Create Profile
                </Button>
              </form>
            </Form>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div variants={fadeInUp} className="text-center">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-success p-2">
                <Check className="h-6 w-6 text-success-foreground" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Profile Created!
            </h2>
            <p className="text-muted-foreground mb-6">
              Your crypto-powered creator profile is ready. Start sharing and
              receiving support!
            </p>
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
