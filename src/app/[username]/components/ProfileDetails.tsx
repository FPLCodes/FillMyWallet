"use client";

import { Instagram, Twitter, Globe, Info } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Profile } from "../src/profileActions";

interface ProfileDetailsProps {
  profile: Profile;
}

export default function ProfileDetails({ profile }: ProfileDetailsProps) {
  return (
    <>
      <div className="flex flex-col sm:flex-row -mt-16 sm:mt-0 gap-3 sm:gap-6 w-full justify-center items-start sm:items-center">
        <Avatar className="w-24 h-24 border-2 border-primary/50 mx-auto">
          <AvatarFallback className="text-xl backdrop-blur bg-primary/10">
            {profile.username[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 mx-auto text-center sm:text-left">
          <div className="flex space-x-2 items-center">
            <h1 className="text-2xl font-bold text-foreground">
              {profile.username}
            </h1>
            <div className="flex gap-1">
              <p className="text-primary/80 font-medium">
                - {profile.uniqueSupportersCount} supporter
                {profile.uniqueSupportersCount === 1 ? "" : "s"}
              </p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-muted-foreground/80 cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-primary/10 text-muted-foreground">
                    <p>
                      Number of unique wallet addresses that have supported this
                      profile.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <p className="text-muted-foreground/60 font-semibold">
            {profile.title}
          </p>
          <div className="flex gap-4 mt-4 justify-center sm:justify-normal">
            {profile.instagram && (
              <Link
                href={profile.instagram}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Instagram className="w-5 h-5" />
              </Link>
            )}
            {profile.twitter && (
              <Link
                href={profile.twitter}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Twitter className="w-5 h-5" />
              </Link>
            )}
            {profile.website && (
              <Link
                href={profile.website}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Globe className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <p className="font-medium text-muted-foreground/80">
          About {profile.username}
        </p>
        <p className="text-muted-foreground bg-muted rounded-lg p-3">
          {profile.bio}
        </p>
      </div>
    </>
  );
}
