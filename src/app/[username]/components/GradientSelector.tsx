"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit3 } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";

interface GradientSelectorProps {
  selectedGradient: string;
  gradients: string[];
  setSelectedGradient: (gradient: string) => void;
}

export default function GradientSelector({
  selectedGradient,
  gradients,
  setSelectedGradient,
}: GradientSelectorProps) {
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
      <DialogContent>
        <DialogTitle className="hidden"></DialogTitle>
        <div className="grid grid-cols-2 gap-4 p-3">
          {gradients.map((gradient, index) => (
            <button
              key={index}
              className={`w-full h-16 rounded-md ${gradient} border-2 ${
                selectedGradient === gradient
                  ? "border-primary"
                  : "border-transparent"
              }`}
              onClick={() => setSelectedGradient(gradient)}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
