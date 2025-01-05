import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import ProfileContent from "./components/ProfileContent";
import ProfileContentSkeleton from "./components/ProfileContentSkeleton";
import Link from "next/link";
import { getProfileAction } from "./src/profileActions";

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  return (
    <Suspense fallback={<ProfileContentSkeleton />}>
      <ProfilePageContentWrapper username={params.username} />
    </Suspense>
  );
}

async function ProfilePageContentWrapper({ username }: { username: string }) {
  const profile = await getProfileAction(username);

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
