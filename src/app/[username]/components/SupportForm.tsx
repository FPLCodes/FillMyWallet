import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Profile } from "../page";
import { Heart } from "lucide-react";

export default function SupportForm({
  profile,
  selectedAmount,
  setSelectedAmount,
  customAmount,
  handleCustomAmountChange,
  displayAmount,
}: {
  profile: Profile;
  selectedAmount: number | "custom";
  setSelectedAmount: (amount: number | "custom") => void;
  customAmount: string;
  handleCustomAmountChange: (value: string) => void;
  displayAmount: string;
}) {
  const predefinedAmounts = [0.1, 0.2, 0.5, 1.0];

  return (
    <Card className="sticky top-8 border-2 border-primary shadow-lg">
      <CardHeader className="bg-primary/5 mb-4">
        <CardTitle className="text-center text-primary">
          Support {profile.username}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <RadioGroup
            defaultValue="0.1"
            className="mb-4"
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
                    className="flex items-center justify-center rounded-md border-2 border-muted bg-card px-3 py-2 hover:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
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
                className="flex items-center justify-center rounded-md border-2 border-muted bg-card px-3 py-2 hover:border-primary peer-data-[state=checked]:border-primary"
              >
                {selectedAmount === "custom" ? (
                  <Input
                    type="text"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    placeholder="Custom"
                    className="w-20 border-none p-0 text-center focus-visible:ring-0"
                  />
                ) : (
                  "Custom"
                )}
              </Label>
            </div>
          </RadioGroup>

          <Input placeholder="Name (optional)" />
          <Textarea
            placeholder="Leave a message (optional)"
            className="resize-none"
            rows={4}
          />
          <Button className="w-full bg-primary hover:bg-primary/90">
            <Heart className="w-4 h-4 mr-2" />
            Support with {displayAmount}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
