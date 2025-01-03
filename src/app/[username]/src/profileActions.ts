"use server";

import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export interface Profile {
  walletAddress: string;
  username: string;
  title?: string;
  bio?: string;
  instagram?: string;
  twitter?: string;
  website?: string;
  coverImage?: number;
  supporters?: {
    name: string;
    amount: number;
    message: string;
    signature: string;
    avatar: string;
  }[];
  uniqueSupportersCount?: number;
}

export async function getProfileAction(
  username: string
): Promise<Profile | null> {
  try {
    // Find the wallet address from the usernames collection
    const usernameDoc = await getDoc(doc(db, "usernames", username));
    if (!usernameDoc.exists()) {
      console.error("Username not found:", username);
      return null;
    }

    const { walletAddress } = usernameDoc.data();
    if (!walletAddress) {
      console.error("No wallet address associated with username:", username);
      return null;
    }

    // Fetch the profile using the wallet address
    const profileDoc = await getDoc(doc(db, "profiles", walletAddress));
    if (!profileDoc.exists()) {
      console.error("Profile not found for wallet address:", walletAddress);
      return null;
    }

    const profileData = profileDoc.data();
    return {
      walletAddress,
      username: profileData.username,
      title: profileData.title || "",
      bio: profileData.bio || "",
      instagram: profileData.instagram || "",
      twitter: profileData.twitter || "",
      website: profileData.website || "",
      coverImage: profileData.coverImage || 0,
      supporters: profileData.supporters || [],
      uniqueSupportersCount: profileData.uniqueSupporters.length || 0,
    };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}
