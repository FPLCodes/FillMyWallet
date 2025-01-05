"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function ProfileContentSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Cover Photo Skeleton */}
      <Skeleton className="w-full h-64 z-0" />

      <div className="max-w-7xl mx-auto px-4 py-8 -mt-20">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-none z-10">
              <CardContent className="p-6">
                {/* Profile Details Skeleton */}
                <div className="flex flex-col sm:flex-row -mt-16 sm:mt-0 gap-3 sm:gap-6 w-full justify-center items-start sm:items-center">
                  <Skeleton className="w-24 h-24 rounded-full" />
                  <div className="flex-1 mx-auto text-center sm:text-left space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-32" />
                    <div className="flex gap-4 mt-4 justify-center sm:justify-normal">
                      <Skeleton className="w-5 h-5 rounded-full" />
                      <Skeleton className="w-5 h-5 rounded-full" />
                      <Skeleton className="w-5 h-5 rounded-full" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-20 w-full" />
                </div>

                {/* Support Form Skeleton for smaller screens */}
                <div className="lg:hidden mt-8">
                  <Card className="border-none shadow-lg">
                    <CardContent className="p-6 space-y-4">
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-24 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </CardContent>
                  </Card>
                </div>

                <div className="my-6" />

                {/* Tabs Skeleton */}
                <Tabs defaultValue="supporters">
                  <TabsList className="w-full gap-2 bg-transparent">
                    <TabsTrigger
                      value="supporters"
                      className="flex-1 py-2 transition-colors hover:bg-muted/60"
                    >
                      Supporters
                    </TabsTrigger>
                    <TabsTrigger
                      value="posts"
                      className="flex-1 py-2 transition-colors hover:bg-muted/60"
                    >
                      Posts
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="supporters">
                    <div className="mt-3 space-y-4">
                      <Skeleton className="h-6 w-40" />
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-4 items-center">
                          <Skeleton className="w-8 h-8 rounded-sm" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-12 w-full" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="posts">
                    <div className="mt-3">
                      <Skeleton className="h-6 w-40 mb-4" />
                      <Skeleton className="h-20 w-full" />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Support Form Skeleton for larger screens */}
          <div className="hidden lg:block lg:col-span-1">
            <Card className="sticky top-8 border-none shadow-lg">
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
