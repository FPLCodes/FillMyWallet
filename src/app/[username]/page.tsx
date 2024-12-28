"use client";

import { motion } from "framer-motion";
import { Instagram, Twitter, Globe, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Hardcoded example data
const profile = {
  username: "cryptoartist",
  name: "Sarah Wilson",
  title: "Digital Artist & NFT Creator",
  bio: "Creating unique digital art and NFT collections. Join me on this creative journey into the world of blockchain art. Your support helps me continue pushing the boundaries of digital creativity.",
  avatar: "/placeholder.svg",
  coverImage: "/placeholder.svg",
  socialLinks: {
    instagram: "https://instagram.com/cryptoartist",
    twitter: "https://twitter.com/cryptoartist",
    website: "https://cryptoartist.com",
  },
  supporters: [
    {
      id: 1,
      name: "Alex",
      amount: "0.1 SOL",
      message: "Love your latest NFT collection! Keep creating amazing art! 🎨",
      avatar: "/placeholder.svg",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      name: "Maria",
      amount: "0.2 SOL",
      message:
        "Your art inspires me every day. Thank you for sharing your talent!",
      avatar: "/placeholder.svg",
      timestamp: "1 day ago",
    },
  ],
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <Avatar className="w-24 h-24 border-2 border-primary">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback>{profile.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-foreground">
                      {profile.name}
                    </h1>
                    <p className="text-muted-foreground">{profile.title}</p>
                    <div className="flex gap-4 mt-4">
                      <Link
                        href={profile.socialLinks.instagram}
                        className="text-muted-foreground hover:text-primary"
                      >
                        <Instagram className="w-5 h-5" />
                      </Link>
                      <Link
                        href={profile.socialLinks.twitter}
                        className="text-muted-foreground hover:text-primary"
                      >
                        <Twitter className="w-5 h-5" />
                      </Link>
                      <Link
                        href={profile.socialLinks.website}
                        className="text-muted-foreground hover:text-primary"
                      >
                        <Globe className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-foreground">{profile.bio}</p>
              </CardContent>
            </Card>

            <Tabs defaultValue="home" className="mt-8">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="home">Home</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="posts">Posts</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Recent Supporters</h2>
              <div className="space-y-4">
                {profile.supporters.map((supporter) => (
                  <Card key={supporter.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarImage src={supporter.avatar} />
                          <AvatarFallback>{supporter.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{supporter.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Supported {supporter.amount}
                              </p>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {supporter.timestamp}
                            </span>
                          </div>
                          <p className="mt-2">{supporter.message}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Support {profile.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  {[0.1, 0.2, 0.5, 1].map((amount) => (
                    <Button
                      key={amount}
                      variant={amount === 0.1 ? "default" : "outline"}
                      className="flex-1"
                    >
                      {amount} SOL
                    </Button>
                  ))}
                </div>
                <Input placeholder="Name (optional)" />
                <Textarea
                  placeholder="Leave a message (optional)"
                  className="resize-none"
                  rows={4}
                />
                <Button className="w-full">
                  <Heart className="w-4 h-4 mr-2" />
                  Support with 0.1 SOL
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
