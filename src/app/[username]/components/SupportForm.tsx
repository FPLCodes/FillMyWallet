import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Profile } from "../page";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useSupportUser } from "../hooks/useSupportUser";
import { toast } from "@/hooks/use-toast";

export default function SupportForm({
  profile,
  refreshSupporters,
  selectedAmount,
  setSelectedAmount,
  customAmount,
  handleCustomAmountChange,
  displayAmount,
}: {
  profile: Profile;
  refreshSupporters: () => void;
  selectedAmount: number | "custom";
  setSelectedAmount: (amount: number | "custom") => void;
  customAmount: string;
  handleCustomAmountChange: (value: string) => void;
  displayAmount: string;
}) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const predefinedAmounts = [0.1, 0.2, 0.5, 1.0];

  const { sendSupport, isProcessing } = useSupportUser(
    profile.walletAddress,
    refreshSupporters
  );

  const handleSupportClick = async () => {
    const amount =
      selectedAmount === "custom" ? parseFloat(customAmount) : selectedAmount;
    if (!amount || isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to support.",
        variant: "destructive",
      });
      return;
    }

    await sendSupport(amount, name, message, profile.walletAddress);
  };

  return (
    <Card className="sticky top-8 border-2 border-primary shadow-lg">
      <CardHeader className="bg-primary/5 mb-4">
        <CardTitle className="text-center text-primary">
          Support {profile.username}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <RadioGroup
            value={
              selectedAmount === "custom" ? "custom" : selectedAmount.toFixed(1)
            }
            onValueChange={(value) =>
              setSelectedAmount(
                value === "custom" ? "custom" : parseFloat(value)
              )
            }
          >
            <div className="flex justify-between mb-2 bg-muted p-4 rounded-lg">
              {predefinedAmounts.map((amount) => (
                <div key={amount.toFixed(1)}>
                  <RadioGroupItem
                    value={amount.toFixed(1)}
                    id={`amount-${amount.toFixed(1)}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`amount-${amount.toFixed(1)}`}
                    className="flex items-center justify-center transition-colors rounded-md border-2 border-muted bg-card px-3 py-2 cursor-pointer hover:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
                  >
                    {amount.toFixed(1)}
                  </Label>
                </div>
              ))}
            </div>
            <div>
              <RadioGroupItem
                value="custom"
                id="amount-custom"
                className="peer sr-only"
              />
              <Label
                htmlFor="amount-custom"
                className="flex items-center justify-center transition-colors rounded-md border-2 border-muted bg-card px-3 py-2 h-10 cursor-pointer hover:border-primary peer-data-[state=checked]:border-primary"
              >
                {selectedAmount === "custom" ? (
                  <Input
                    type="text"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    placeholder=""
                    className="w-full border-none p-0 text-center focus-visible:ring-0 shadow-none"
                  />
                ) : (
                  "Custom"
                )}
              </Label>
            </div>
          </RadioGroup>

          <Input
            placeholder="Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="focus-visible:ring-0"
          />
          <Textarea
            placeholder="Leave a message (optional)"
            className="resize-none focus-visible:ring-0"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            className="w-full border-secondary border-2 bg-primary transition-colors hover:bg-primary/90"
            onClick={handleSupportClick}
            disabled={isProcessing}
          >
            {isProcessing ? (
              "Processing..."
            ) : (
              <Heart className="w-4 h-4 mr-2" />
            )}
            {isProcessing ? "" : `Support with ${displayAmount}`}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
