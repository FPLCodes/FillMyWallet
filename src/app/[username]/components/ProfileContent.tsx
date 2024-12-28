"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Twitter, Globe, Heart } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Profile } from "../page";

interface ProfileContentProps {
  profile: Profile;
}

export default function ProfileContent({ profile }: ProfileContentProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(0.1);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [showAllSupporters, setShowAllSupporters] = useState(false);

  const predefinedAmounts = [0.1, 0.2, 0.5, 1];

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
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Profile Card */}
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

            {/* Support Form for smaller screens */}
            <div className="lg:hidden mt-8">
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
                                  {supporter.name[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium">
                                      {supporter.name}
                                    </p>
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
                  ) : (
                    <Card>
                      <CardContent className="p-8 text-center text-muted-foreground">
                        No supporters yet. Be the first one to support{" "}
                        {profile.name}!
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
                      {profile.name}!
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
  );
}

function SupportForm({
  profile,
  selectedAmount,
  setSelectedAmount,
  customAmount,
  handleCustomAmountChange,
  displayAmount,
}: {
  profile: Profile;
  selectedAmount: number | "custom";
  setSelectedAmount: (amount: number | "custom") => void;
  customAmount: string;
  handleCustomAmountChange: (value: string) => void;
  displayAmount: string;
}) {
  const predefinedAmounts = [0.1, 0.2, 0.5, 1];

  return (
    <Card className="sticky top-8 border-2 border-primary shadow-lg">
      <CardHeader className="bg-primary/5 mb-4">
        <CardTitle className="text-center text-primary">
          Support {profile.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <RadioGroup
            defaultValue="0.1"
            className="mb-4"
            onValueChange={(value) =>
              setSelectedAmount(
                value === "custom" ? "custom" : parseFloat(value)
              )
            }
          >
            <div className="flex justify-between mb-2">
              {predefinedAmounts.map((amount) => (
                <div key={amount}>
                  <RadioGroupItem
                    value={amount.toString()}
                    id={`amount-${amount}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`amount-${amount}`}
                    className="flex items-center justify-center rounded-md border-2 border-muted bg-card px-3 py-2 hover:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
                  >
                    {amount}
                  </Label>
                </div>
              ))}
            </div>
            <div>
              <RadioGroupItem
                value="custom"
                id="amount-custom"
                className="peer sr-only"
              />
              <Label
                htmlFor="amount-custom"
                className="flex items-center justify-center rounded-md border-2 border-muted bg-card px-3 py-2 hover:border-primary peer-data-[state=checked]:border-primary"
              >
                {selectedAmount === "custom" ? (
                  <Input
                    type="text"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    placeholder="Custom"
                    className="w-20 border-none p-0 text-center focus-visible:ring-0"
                  />
                ) : (
                  "Custom"
                )}
              </Label>
            </div>
          </RadioGroup>

          <Input placeholder="Name (optional)" />
          <Textarea
            placeholder="Leave a message (optional)"
            className="resize-none"
            rows={4}
          />
          <Button className="w-full bg-primary hover:bg-primary/90">
            <Heart className="w-4 h-4 mr-2" />
            Support with {displayAmount}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
