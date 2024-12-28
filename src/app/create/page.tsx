"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Wallet2,
  ArrowRight,
  ArrowLeft,
  LinkIcon,
  Loader2,
} from "lucide-react";
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
  website: z.string().url().optional().or(z.literal("")),
});

export default function CreateProfile() {
  const [step, setStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const { connected, publicKey } = useWallet();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      bio: "",
      website: "",
    },
  });

  useEffect(() => {
    if (connected && publicKey) {
      console.log("Connected wallet:", publicKey.toBase58());

      // TODO: Implement check with backend
      // If user exists, redirect to dashboard
      // Example:
      // checkUserExists(publicKey.toBase58()).then(exists => {
      //   if (exists) window.location.href = '/dashboard'
      // })
    }
  }, [connected, publicKey]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsCreating(true);
    console.log(values);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // TODO: Implement actual profile creation logic here

    // Redirect to profile page
    window.location.href = "/profile";
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
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website or Social Link (Optional)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                          <Input
                            placeholder="https://your-website.com"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Share your website or main social media profile.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isCreating}>
                  {isCreating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Profile...
                    </>
                  ) : (
                    "Create Profile"
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
