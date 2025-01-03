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
  Loader2,
  Instagram,
  XIcon,
  Globe,
} from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "@/hooks/use-toast";
import { useProfile } from "./hooks/useProfile";
import { redirect } from "next/navigation";

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
  title: z.string().max(100).optional(),
  bio: z.string().max(160).optional(),
  website: z.string().url().optional().or(z.literal("")),
  instagram: z.string().url().optional().or(z.literal("")),
  x: z.string().url().optional().or(z.literal("")),
});

export default function CreateProfile() {
  const [step, setStep] = useState(1);
  const { connected, publicKey } = useWallet();
  const { isCreating, error, createProfile, checkProfile } = useProfile();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      title: "",
      bio: "",
      website: "",
      instagram: "",
      x: "",
    },
  });

  useEffect(() => {
    const fetchExistingProfile = async () => {
      if (connected && publicKey) {
        const username = await checkProfile(publicKey.toBase58());
        if (username) {
          redirect(`/${username}`);
        }
      }
    };

    fetchExistingProfile();
  }, [connected, publicKey, checkProfile]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!publicKey) {
      toast({
        title: "Error",
        description: "Please connect your wallet.",
        variant: "destructive",
      });
      return;
    }

    const profile = {
      ...values,
      walletAddress: publicKey.toBase58(),
      coverImage: Math.floor(Math.random() * 4),
      supporters: [],
      uniqueSupporters: [],
    };

    const walletAddress = publicKey.toBase58();
    const username = await createProfile(walletAddress, profile);

    if (username) {
      toast({
        title: "Success",
        description:
          "Profile created successfully! Redirecting to your profile...",
        duration: 2000,
      });
      redirect(`/${username}`);
    }
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
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="web3dev"
                          className="placeholder:text-muted-foreground/50"
                          {...field}
                        />
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
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Title{" "}
                        <span className="text-xs text-muted-foreground">
                          (optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Blockchain Developer & Educator"
                          className="placeholder:text-muted-foreground/50"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        A short description of what you do.
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
                      <FormLabel>
                        Bio{" "}
                        <span className="text-xs text-muted-foreground">
                          (optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Teaching others about blockchain technology and smart contract development."
                          className="placeholder:text-muted-foreground/50"
                          {...field}
                          maxLength={160}
                        />
                      </FormControl>
                      <FormDescription>
                        Keep it short and sweet. Max 160 characters.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Website and Social Links{" "}
                          <span className="text-xs text-muted-foreground">
                            (optional)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                            <Input
                              placeholder="https://your-website.com"
                              className="pl-10 pr-10 placeholder:text-muted-foreground/50"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <Instagram className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                          <FormControl>
                            <Input
                              placeholder="https://instagram.com/your-username"
                              className="pl-10 pr-10  placeholder:text-muted-foreground/50"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="x"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <XIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                          <FormControl>
                            <Input
                              placeholder="https://x.com"
                              className="pl-10 pr-10 placeholder:text-muted-foreground/50"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
                {error && <p className="text-red-500 mt-4">{error}</p>}
              </form>
            </Form>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
