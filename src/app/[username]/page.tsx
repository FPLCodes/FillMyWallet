import { Button } from "@/components/ui/button";
import ProfileContent from "./components/ProfileContent";
import Link from "next/link";

export interface Profile {
  username: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  coverImage: string;
  socialLinks: {
    instagram: string;
    twitter: string;
    website: string;
  };
  supporters: {
    id: number;
    name: string;
    amount: string;
    message: string;
    avatar: string;
    timestamp: string;
  }[];
}

// This would typically come from your database
const profiles: Record<string, Profile> = {
  cryptoartist: {
    username: "cryptoartist",
    name: "Sarah Wilson",
    title: "Digital Artist & NFT Creator",
    bio: "Creating unique digital art and NFT collections. Join me on this creative journey into the world of blockchain art. Your support helps me continue pushing the boundaries of digital creativity.",
    avatar: "/placeholder.svg",
    coverImage: "/placeholder.svg",
    socialLinks: {
      instagram: "https://instagram.com/cryptoartist",
      twitter: "https://twitter.com/cryptoartist",
      website: "https://cryptoartist.com",
    },
    supporters: [
      {
        id: 1,
        name: "Alex",
        amount: "0.1 SOL",
        message:
          "Love your latest NFT collection! Keep creating amazing art! 🎨",
        avatar: "/placeholder.svg",
        timestamp: "2 hours ago",
      },
      {
        id: 2,
        name: "Maria",
        amount: "0.2 SOL",
        message:
          "Your art inspires me every day. Thank you for sharing your talent!",
        avatar: "/placeholder.svg",
        timestamp: "1 day ago",
      },
    ],
  },
  web3dev: {
    username: "web3dev",
    name: "John Smith",
    title: "Blockchain Developer & Educator",
    bio: "Building the future of Web3. Teaching others about blockchain technology and smart contract development.",
    avatar: "/placeholder.svg",
    coverImage: "/placeholder.svg",
    socialLinks: {
      instagram: "https://instagram.com/web3dev",
      twitter: "https://twitter.com/web3dev",
      website: "https://web3dev.com",
    },
    supporters: [],
  },
};

async function getProfile(username: string): Promise<Profile | null> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return profiles[username] || null;
}

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const profile = await getProfile(params.username);

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Profile Not Found
        </h1>
        <p className="text-muted-foreground mb-8">
          The creator you&apos;re looking for doesn&apos;t exist or hasn&apos;t
          created their profile yet.
        </p>
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    );
  }

  return <ProfileContent profile={profile} />;
}
