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
import { toast } from "@/hooks/use-toast";

interface Supporter {
  name?: string;
  message?: string;
  amount: number;
  signature: string;
}

export const useSupportUser = (
  recipientPublicKey: string,
  refreshSupporters: () => void
) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { publicKey, sendTransaction } = useWallet();

  const sendSupport = async (
    amount: number,
    name: string,
    message: string,
    userWalletAddress: string
  ) => {
    if (!publicKey) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to proceed.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsProcessing(true);

      const connection = new Connection(
        process.env.NEXT_PUBLIC_SOLANA_RPC_URL!
      );
      const recipientKey = new PublicKey(recipientPublicKey);
      const platformWalletKey = new PublicKey(
        process.env.NEXT_PUBLIC_PLATFORM_WALLET!
      );

      // Constants
      const platformFeePercentage = 0.01; // 1% fee
      const lamportsPerSol = 10 ** 9;

      // Calculate amounts
      const totalLamports = amount * lamportsPerSol; // Convert SOL to lamports
      const platformFee = Math.floor(totalLamports * platformFeePercentage);
      const recipientAmount = totalLamports - platformFee;

      // Fetch latest blockhash
      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash();

      // Create transaction with two transfer instructions
      const transaction = new Transaction().add(
        // Transfer to the creator
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientKey,
          lamports: recipientAmount,
        }),
        // Transfer the platform fee
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: platformWalletKey,
          lamports: platformFee,
        })
      );

      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      // Send transaction
      const signature = await sendTransaction(transaction, connection);

      // Confirm the transaction
      await connection.confirmTransaction(
        {
          signature,
          blockhash,
          lastValidBlockHeight,
        },
        "confirmed"
      );

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
        uniqueSupporters: arrayUnion(publicKey.toBase58()),
      });

      // Notify the user of success
      toast({
        title: "Support sent successfully",
        description: `You have supported ${amount} SOL.`,
      });

      // Refresh supporters list
      refreshSupporters();
    } catch (error) {
      console.error("Error sending support:", error);
      toast({
        title: "Transaction failed",
        description: "There was an error processing your transaction.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return { sendSupport, isProcessing };
};
