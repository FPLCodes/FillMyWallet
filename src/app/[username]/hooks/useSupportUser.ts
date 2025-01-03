import { useState } from "react";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
} from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { db } from "@/lib/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

interface Supporter {
  name?: string;
  message?: string;
  amount: number;
  signature: string;
}

export const useSupportUser = (recipientPublicKey: string) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { publicKey, sendTransaction } = useWallet();

  const sendSupport = async (
    amount: number,
    name: string,
    message: string,
    userWalletAddress: string
  ) => {
    if (!publicKey) {
      alert("Please connect your wallet.");
      return;
    }

    try {
      setIsProcessing(true);

      const connection = new Connection("https://api.devnet.solana.com");
      const recipientKey = new PublicKey(recipientPublicKey);

      // Fetch latest blockhash
      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash();

      // Create transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientKey,
          lamports: amount * 10 ** 9, // Convert SOL to lamports
        })
      );

      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      // Send transaction
      const signature = await sendTransaction(transaction, connection);

      // Confirm the transaction using the new API
      await connection.confirmTransaction(
        {
          signature,
          blockhash,
          lastValidBlockHeight,
        },
        "confirmed" // Commitment level
      );

      console.log("Transaction successful:", signature);

      // Update Firestore
      const newSupporter: Supporter = {
        name,
        message,
        amount,
        signature,
      };

      const userDocRef = doc(db, "profiles", userWalletAddress);
      await updateDoc(userDocRef, {
        supporters: arrayUnion(newSupporter),
      });

      alert("Support successful!");
    } catch (error) {
      console.error("Error processing transaction:", error);
      alert("There was an error processing the transaction. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return { sendSupport, isProcessing };
};
