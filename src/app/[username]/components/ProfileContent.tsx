"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Twitter, Globe } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Profile } from "../page";
import SupportForm from "./SupportForm";
import GradientSelector from "./GradientSelector";

interface ProfileContentProps {
  profile: Profile;
}

const gradients = [
  "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500",
  "bg-gradient-to-r from-blue-400 via-teal-500 to-green-500",
  "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500",
  "bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500",
];

export default function ProfileContent({ profile }: ProfileContentProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(0.1);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [showAllSupporters, setShowAllSupporters] = useState(false);
  const [selectedGradient, setSelectedGradient] = useState(gradients[0]);

  const handleCustomAmountChange = (value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setCustomAmount(value);
    }
  };

  const displayAmount =
    selectedAmount === "custom"
      ? customAmount
        ? `${customAmount} SOL`
        : "Custom Amount"
      : `${selectedAmount} SOL`;

  const visibleSupporters = showAllSupporters
    ? profile.supporters
    : profile.supporters.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Cover Photo */}
      <div className={`w-full h-64 ${selectedGradient}`}>
        <div className="mx-auto px-4 h-full flex items-start justify-end pt-20">
          <GradientSelector
            selectedGradient={selectedGradient}
            gradients={gradients}
            setSelectedGradient={setSelectedGradient}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 -mt-20">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Profile Card */}
              <Card className="mb-8 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    <Avatar className="w-24 h-24 border-4 border-background">
                      <AvatarImage src={profile.avatar} />
                      <AvatarFallback>{profile.username[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h1 className="text-2xl font-bold text-foreground">
                        {profile.username}
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

              {/* Support Form for smaller screens */}
              <div className="lg:hidden mb-8">
                <SupportForm
                  profile={profile}
                  selectedAmount={selectedAmount}
                  setSelectedAmount={setSelectedAmount}
                  customAmount={customAmount}
                  handleCustomAmountChange={handleCustomAmountChange}
                  displayAmount={displayAmount}
                />
              </div>

              {/* Tabs */}
              <Tabs defaultValue="supporters" className="mt-8">
                <TabsList className="w-full">
                  <TabsTrigger value="supporters" className="flex-1">
                    Supporters
                  </TabsTrigger>
                  <TabsTrigger value="posts" className="flex-1">
                    Posts
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="supporters">
                  <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-4">
                      Recent Supporters
                    </h2>
                    {visibleSupporters.length > 0 ? (
                      <div className="space-y-4">
                        {visibleSupporters.map((supporter) => (
                          <Card key={supporter.id}>
                            <CardContent className="p-4">
                              <div className="flex gap-4">
                                <Avatar>
                                  <AvatarImage src={supporter.avatar} />
                                  <AvatarFallback>
                                    {supporter.name?.[0] ?? "U"}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex justify-between items-start">
                                    <div className="flex items-center space-x-1">
                                      <p className="font-semibold">
                                        {supporter.name?.split(" ")[0] ??
                                          "Kind stranger"}
                                      </p>
                                      <p className="text-muted-foreground">
                                        filled {supporter.amount} SOL
                                      </p>
                                    </div>
                                  </div>
                                  <p className="mt-2">{supporter.message}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <Card>
                        <CardContent className="p-8 text-center text-muted-foreground">
                          No supporters yet. Be the first one to support{" "}
                          {profile.username}!
                        </CardContent>
                      </Card>
                    )}
                    {profile.supporters.length > 3 && !showAllSupporters && (
                      <Button
                        variant="outline"
                        className="mt-4 w-full"
                        onClick={() => setShowAllSupporters(true)}
                      >
                        Show More
                      </Button>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="posts">
                  <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-4">Posts</h2>
                    <Card>
                      <CardContent className="p-8 text-center text-muted-foreground">
                        No posts yet. Check back later for updates from{" "}
                        {profile.username}!
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Support Form for larger screens */}
          <div className="hidden lg:block lg:col-span-1">
            <SupportForm
              profile={profile}
              selectedAmount={selectedAmount}
              setSelectedAmount={setSelectedAmount}
              customAmount={customAmount}
              handleCustomAmountChange={handleCustomAmountChange}
              displayAmount={displayAmount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
