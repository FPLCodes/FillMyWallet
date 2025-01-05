"use server";

import { db } from "@/lib/firebase";
import { getDocs, query, where, collection } from "firebase/firestore";

export async function getUsernameFromWallet(
  walletAddress: string
): Promise<string | null> {
  try {
    const usernamesRef = collection(db, "usernames");
    const q = query(usernamesRef, where("walletAddress", "==", walletAddress));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return snapshot.docs[0].id; // Username is the document ID
    }
    return null;
  } catch (error) {
    console.error("Error fetching username from wallet address:", error);
    return null;
  }
}
