import { useState, useMemo, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Profile } from "../page";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const gradients = [
  "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500",
  "bg-gradient-to-r from-blue-400 via-teal-500 to-green-500",
  "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500",
  "bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500",
];

export const useGetProfileContent = (profile: Profile) => {
  const [supporters, setSupporters] = useState(profile.supporters);
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(0.1);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [showAllSupporters, setShowAllSupporters] = useState(false);
  const [selectedGradient, setSelectedGradient] = useState(
    gradients[(profile.coverImage ?? 0) % gradients.length]
  );

  const { publicKey } = useWallet();
  const isOwnProfile = useMemo(
    () => publicKey && publicKey.toBase58() === profile.walletAddress,
    [publicKey, profile.walletAddress]
  );

  const visibleSupporters = useMemo(
    () => (showAllSupporters ? supporters : supporters.slice(0, 3)),
    [showAllSupporters, supporters]
  );

  const displayAmount = useMemo(() => {
    if (selectedAmount === "custom") {
      return customAmount ? `${customAmount} SOL` : "Custom Amount";
    }
    return `${selectedAmount} SOL`;
  }, [selectedAmount, customAmount]);

  const handleCustomAmountChange = (value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setCustomAmount(value);
    }
  };

  const refreshSupporters = useCallback(async () => {
    try {
      const profileDoc = await getDoc(
        doc(db, "profiles", profile.walletAddress)
      );
      if (profileDoc.exists()) {
        const profileData = profileDoc.data();
        setSupporters(profileData.supporters || []);
      }
    } catch (error) {
      console.error("Error refreshing supporters:", error);
    }
  }, [profile.walletAddress]);

  return {
    selectedAmount,
    setSelectedAmount,
    customAmount,
    setCustomAmount,
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
  };
};
