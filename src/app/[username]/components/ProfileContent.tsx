"use client";

import { Instagram, Twitter, Globe } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Profile } from "../page";
import SupportForm from "./SupportForm";
import GradientSelector from "./GradientSelector";
import { useGetProfileContent } from "../hooks/useGetProfileContent";

interface ProfileContentProps {
  profile: Profile;
}

export default function ProfileContent({ profile }: ProfileContentProps) {
  const {
    selectedAmount,
    setSelectedAmount,
    customAmount,
    handleCustomAmountChange,
    showAllSupporters,
    setShowAllSupporters,
    selectedGradient,
    setSelectedGradient,
    isOwnProfile,
    visibleSupporters = [],
    displayAmount,
    gradients,
    refreshSupporters,
  } = useGetProfileContent(profile);

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
        <div
          className={`grid gap-8 ${
            isOwnProfile ? "lg:grid-cols-1" : "lg:grid-cols-3"
          }`}
        >
          <div className={isOwnProfile ? "w-full" : "lg:col-span-2"}>
            {/* Main Card */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                {/* Profile Details */}
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <Avatar className="w-24 h-24 border-2 border-primary">
                    <AvatarFallback className="text-xl">
                      {profile.username[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex space-x-2 items-center">
                      <h1 className="text-2xl font-bold text-foreground">
                        {profile.username}
                      </h1>
                      <p className="text-primary/80 font-medium">
                        - {profile.uniqueSupportersCount} supporter{" "}
                        {profile.uniqueSupportersCount === 1 ? "" : "s"}
                      </p>
                    </div>
                    <p className="text-muted-foreground/60 font-semibold">
                      {profile.title}
                    </p>
                    <div className="flex gap-4 mt-4">
                      {/* Social Links */}
                      {profile.instagram && (
                        <Link
                          href={profile.instagram}
                          className="text-muted-foreground hover:text-primary"
                        >
                          <Instagram className="w-5 h-5" />
                        </Link>
                      )}
                      {profile.twitter && (
                        <Link
                          href={profile.twitter}
                          className="text-muted-foreground hover:text-primary"
                        >
                          <Twitter className="w-5 h-5" />
                        </Link>
                      )}
                      {profile.website && (
                        <Link
                          href={profile.website}
                          className="text-muted-foreground hover:text-primary"
                        >
                          <Globe className="w-5 h-5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-muted-foreground bg-muted rounded-lg p-3">
                  {profile.bio}
                </p>

                {/* Support Form for smaller screens */}
                {!isOwnProfile && (
                  <div className="lg:hidden mt-8">
                    <SupportForm
                      profile={profile}
                      selectedAmount={selectedAmount}
                      setSelectedAmount={setSelectedAmount}
                      customAmount={customAmount}
                      handleCustomAmountChange={handleCustomAmountChange}
                      displayAmount={displayAmount}
                      refreshSupporters={refreshSupporters}
                    />
                  </div>
                )}

                <div className="my-6" />

                {/* Tabs */}
                <Tabs defaultValue="supporters">
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
                        <div className="space-y-6 text-sm">
                          {visibleSupporters.map((supporter, index) => (
                            <div
                              key={index}
                              className={`flex gap-4 ${
                                !supporter.message ? "items-center" : ""
                              }`}
                            >
                              <Avatar className="w-8 h-8 rounded-sm">
                                <AvatarImage
                                  src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${supporter.signature}eyes=closed,closed2,cute,glasses,pissed,plain,sad,shades,sleepClose,stars,wink,wink2,crying&mouth=cute,lilSmile,plain,shout,sick,smileLol,smileTeeth,tongueOut,wideSmile`}
                                />
                                <AvatarFallback>
                                  {supporter.name?.[0] ?? "U"}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <div className="flex items-center space-x-1">
                                    <p className="font-semibold">
                                      {supporter.name === ""
                                        ? "Kind stranger"
                                        : supporter.name}
                                    </p>
                                    <p>filled</p>
                                    <a
                                      className="text-primary/80 transition-colors hover:text-primary cursor-pointer"
                                      href={`https://explorer.solana.com/tx/${supporter.signature}?cluster=devnet`}
                                      target="_blank"
                                    >
                                      {supporter.amount} SOL
                                    </a>
                                  </div>
                                </div>
                                {supporter.message ? (
                                  <p className="mt-2 bg-primary/10 rounded-md p-3">
                                    {supporter.message}
                                  </p>
                                ) : null}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-muted-foreground">
                          No supporters yet. Be the first one to support{" "}
                          {profile.username}!
                        </p>
                      )}
                      {(profile.supporters?.length ?? 0) > 3 &&
                        !showAllSupporters && (
                          <Button
                            variant="outline"
                            className="mt-4 w-full transition-colors hover:bg-primary/10 hover:text-black"
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
                      <p className="text-center text-muted-foreground">
                        No posts yet. Check back later for updates from{" "}
                        {profile.username}!
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Support Form for larger screens */}
          {!isOwnProfile && (
            <div className="hidden lg:block lg:col-span-1">
              <SupportForm
                profile={profile}
                selectedAmount={selectedAmount}
                setSelectedAmount={setSelectedAmount}
                customAmount={customAmount}
                handleCustomAmountChange={handleCustomAmountChange}
                displayAmount={displayAmount}
                refreshSupporters={refreshSupporters}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
