"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Profile } from "../src/profileActions";

interface SupportersListProps {
  profile: Profile;
  visibleSupporters: Profile["supporters"];
  showAllSupporters: boolean;
  setShowAllSupporters: (value: boolean) => void;
}

export default function SupportersList({
  profile,
  visibleSupporters = [],
  showAllSupporters,
  setShowAllSupporters,
}: SupportersListProps) {
  const supporterAvatarUrl = (text: string) =>
    `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${text}eyes=closed,closed2,cute,glasses,pissed,plain,sad,shades,sleepClose,stars,wink,wink2,crying&mouth=cute,lilSmile,plain,shout,sick,smileLol,smileTeeth,tongueOut,wideSmile`;

  return (
    <div className="mt-3">
      <h2 className="text-xl font-semibold mb-4">Recent Supporters</h2>
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
                <AvatarImage src={supporterAvatarUrl(supporter.signature)} />
                <AvatarFallback>{supporter.name?.[0] ?? "U"}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-1">
                    <p className="font-semibold">
                      {supporter.name === "" ? "Kind stranger" : supporter.name}
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
                {supporter.message && (
                  <p className="mt-2 bg-primary/10 rounded-md p-3">
                    {supporter.message}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          No supporters yet. Be the first one to support {profile.username}!
        </p>
      )}
      {(profile.supporters?.length ?? 0) > 3 && !showAllSupporters && (
        <Button
          variant="outline"
          className="mt-4 shadow w-full transition-colors border-none hover:bg-primary/10 hover:text-black"
          onClick={() => setShowAllSupporters(true)}
        >
          Show More
        </Button>
      )}
    </div>
  );
}
