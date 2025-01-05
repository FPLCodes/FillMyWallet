import { useState } from "react";
import { createProfileAction, checkProfileAction } from "../src/profileActions";
import { Profile } from "@/app/[username]/src/profileActions";

export function useProfile() {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProfile = async (walletAddress: string, profileData: Profile) => {
    setIsCreating(true);
    setError(null);

    try {
      const username = await createProfileAction(walletAddress, profileData);
      return username;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
      return null;
    } finally {
      setIsCreating(false);
    }
  };

  const checkProfile = async (walletAddress: string) => {
    try {
      const username = await checkProfileAction(walletAddress);
      return username;
    } catch (err) {
      console.error("Error checking profile:", err);
      return null;
    }
  };

  return {
    isCreating,
    error,
    createProfile,
    checkProfile,
  };
}
