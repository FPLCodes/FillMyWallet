"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import GradientSelector from "./GradientSelector";
import SupportForm from "./SupportForm";
import ProfileDetails from "./ProfileDetails";
import SupportersList from "./SupportersList";
import { useGetProfileContent } from "../hooks/useGetProfileContent";
import { Profile } from "../src/profileActions";

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
    visibleSupporters,
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
            <Card className="shadow-lg border-none">
              <CardContent className="p-6">
                <ProfileDetails profile={profile} />
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
                <Tabs defaultValue="supporters">
                  <TabsList className="w-full gap-2 bg-transparent">
                    <TabsTrigger
                      value="supporters"
                      className="flex-1 transition-colors hover:bg-muted/50"
                    >
                      Supporters
                    </TabsTrigger>
                    <TabsTrigger
                      value="posts"
                      className="flex-1 transition-colors hover:bg-muted/50"
                    >
                      Posts
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="supporters">
                    <SupportersList
                      profile={profile}
                      visibleSupporters={visibleSupporters}
                      showAllSupporters={showAllSupporters}
                      setShowAllSupporters={setShowAllSupporters}
                    />
                  </TabsContent>
                  <TabsContent value="posts">
                    <div className="mt-3">
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
