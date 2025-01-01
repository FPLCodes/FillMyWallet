"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { useWallet } from "@solana/wallet-adapter-react";
import { useProfile } from "../hooks/useProfile";
import { redirect } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Instagram, XIcon } from "lucide-react";
import { motion } from "framer-motion";

const formSchema = z.object({
  username: z.string().min(3).max(50),
  title: z.string().max(100).optional(),
  bio: z.string().max(160).optional(),
  website: z.string().url().optional().or(z.literal("")),
  instagram: z.string().url().optional().or(z.literal("")),
  x: z.string().url().optional().or(z.literal("")),
});

export function ProfileForm() {
  const { publicKey } = useWallet();
  const { createProfile, isCreating, error } = useProfile();

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!publicKey) return;

    const walletAddress = publicKey.toBase58();
    const username = await createProfile(
      walletAddress,
      values.username,
      values
    );

    if (username) {
      redirect(`/${username}`);
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <motion.div variants={fadeInUp}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="your-awesome-name" {...field} />
                </FormControl>
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
                    placeholder="e.g. Digital Artist & NFT Creator"
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
                    placeholder="Tell your supporters about yourself"
                    className="resize-none placeholder:text-muted-foreground/50"
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
                        className="pl-10 placeholder:text-muted-foreground/50"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Instagram className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                        <Input
                          placeholder="https://instagram.com/yourusername"
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
                name="x"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <XIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                        <Input
                          placeholder="https://x.com/yourusername"
                          className="pl-10 pr-10 placeholder:text-muted-foreground/50"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" disabled={isCreating}>
            {isCreating ? "Creating Profile..." : "Create Profile"}
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </Form>
    </motion.div>
  );
}
