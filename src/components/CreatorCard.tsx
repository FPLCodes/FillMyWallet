"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface CreatorCardProps {
  name: string;
  description: string;
  supporters: number;
  href: string;
}

export default function CreatorCard({
  name,
  description,
  supporters,
  href,
}: CreatorCardProps) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="bg-card border-primary dark:border-secondary">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-primary dark:border-secondary">
              <AvatarImage src={`https://avatar.vercel.sh/${name}`} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {name[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">{name}</h3>
              <p className="text-sm text-muted-foreground">
                {supporters} supporters
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{description}</p>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
