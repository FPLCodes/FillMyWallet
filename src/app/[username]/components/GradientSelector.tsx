"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit3 } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface GradientSelectorProps {
  selectedGradient: string;
  gradients: string[];
  setSelectedGradient: (gradient: string) => void;
  walletAddress: string;
  currentCoverImage: number;
}

export default function GradientSelector({
  selectedGradient,
  gradients,
  setSelectedGradient,
  walletAddress,
  currentCoverImage,
}: GradientSelectorProps) {
  const [isApplying, setIsApplying] = useState(false);
  const { toast } = useToast();

  const handleApply = async () => {
    setIsApplying(true);
    const selectedIndex = gradients.indexOf(selectedGradient);

    try {
      const userDocRef = doc(db, "profiles", walletAddress);
      await updateDoc(userDocRef, { coverImage: selectedIndex });
      toast({ description: "Cover image updated successfully!" });
    } catch (error) {
      console.error("Error updating cover image:", error);
      toast({
        description: "Failed to update cover image.",
        variant: "destructive",
      });
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-0 bg-muted/40 hover:bg-muted/60 hover:text-muted-foreground"
        >
          <Edit3 />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-5">
        <DialogTitle className="text-lg font-medium text-center">
          Select Your Cover Gradient
        </DialogTitle>
        <div className="grid grid-cols-2 gap-4">
          {gradients.map((gradient, index) => (
            <button
              key={index}
              className={`w-full h-16 rounded-md ${gradient} border-2 ${
                selectedGradient === gradient ? "border-primary" : "border-none"
              }`}
              onClick={() => setSelectedGradient(gradient)}
            />
          ))}
        </div>
        <Button
          className="w-full"
          onClick={handleApply}
          disabled={
            isApplying ||
            gradients.indexOf(selectedGradient) === currentCoverImage
          }
        >
          {isApplying ? "Applying..." : "Apply"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
