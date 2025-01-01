"use server";

import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function createProfileAction(
  walletAddress: string,
  profileData: any
) {
  try {
    // Check if username exists
    const usernameDoc = await getDoc(
      doc(db, "usernames", profileData.username)
    );
    if (usernameDoc.exists()) {
      throw new Error("Username is already taken. Please choose another.");
    }

    // Save username
    await setDoc(doc(db, "usernames", profileData.username), { walletAddress });

    // Save profile
    await setDoc(doc(db, "profiles", walletAddress), {
      ...profileData,
      walletAddress,
      createdAt: new Date().toISOString(),
    });

    return profileData.username;
  } catch (error) {
    throw error;
  }
}

export async function checkProfileAction(walletAddress: string) {
  const profileDoc = await getDoc(doc(db, "profiles", walletAddress));
  if (profileDoc.exists()) {
    return profileDoc.data()?.username || null;
  }
  return null;
}
