import { Button } from "@/components/ui/button";
import ProfileContent from "./components/ProfileContent";
import Link from "next/link";
import { getProfileAction } from "./src/profileActions";

export interface Profile {
  username: string;
  title?: string;
  bio?: string;
  instagram?: string;
  twitter?: string;
  website?: string;
  coverImage?: number;
  supporters: {
    id: number;
    name?: string;
    amount: number;
    message?: string;
    avatar: string;
  }[];
}

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  // `params` is synchronous, so we directly pass `params.username`
  const profile = await getProfileAction(params.username);
  console.log(profile);

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
