"use client";

import Image from "next/image";
import { useAppContext } from "@/contexts/app-context-provider";
import { User } from "@/models/user";
import { UserPublicResponse } from "@/models/publicUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUserCircle } from "react-icons/fa";
import { Card } from "@/components/ui/card";
import { LuPencil } from "react-icons/lu";
import { MotionButton } from "@/components/ui/motion-button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TraderComponent({
  profile,
  username,
}: {
  profile: UserPublicResponse;
  username: string;
}) {
  const { user } = useAppContext();
  const parsedUser = user ? User.fromJSON(user) : null;

  const isOwner =
    parsedUser?.profile?.username?.toLowerCase() === username?.toLowerCase();

  if (isOwner) {
    return (
      <Card className="w-full bg-card p-0 pb-12 rounded-xl">
        <div className="mb-13 relative">
          <div className="relative h-50 w-full rounded-t-xl overflow-hidden">
            <Image
              src="/images/default-user-cover-image.jpg"
              alt="Trader cover image"
              fill
              className="object-cover"
            />
            <MotionButton
              variant="ghost"
              size="sm"
              className="absolute right-4 top-4 bg-black/30 hover:bg-black/40 text-white"
            >
              <LuPencil />
            </MotionButton>
          </div>

          <div className="absolute left-12 top-26">
            <Avatar className="w-36 h-36 border-4 border-background cursor-pointer transition">
              <AvatarImage src={parsedUser?.profile?.profile_picture || ""} />
              <AvatarFallback className="flex items-center justify-center bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-300">
                <FaUserCircle className="size-34" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="px-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
            <div className="mt-2 flex flex-col gap-2">
              <div>
                <p className="text-2xl font-bold text-foreground">
                  Trader @ {user?.profile.username}
                </p>
                <p className="text-neutral-400">
                  {user?.profile.full_name || user?.profile.display_name}
                </p>
                <div className="mt-6 flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground">
                      {user?.followers_count ?? 0}
                    </span>
                    <span className="text-neutral-400 text-sm">Followers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground">
                      {user?.following_count ?? 0}
                    </span>
                    <span className="text-neutral-400 text-sm">Following</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground">
                      {user?.activity.total_points ?? 0}
                    </span>
                    <span className="text-neutral-400 text-sm">
                      Total points
                    </span>
                  </div>
                </div>
              </div>
              {user?.profile.bio && (
                <p className="mt-2 text-neutral-300 max-w-3xl">
                  {user.profile.bio}
                </p>
              )}
            </div>
            <MotionButton
              variant="default"
              className="text-sm rounded-md px-4 py-2 transition"
            >
              <LuPencil />
              Edit Profile
            </MotionButton>
          </div>
        </div>
        <div>
          <Tabs defaultValue="watchlists" className="px-8 w-full">
            <TabsList>
              <TabsTrigger value="watchlists">Public Watchlists</TabsTrigger>
              <TabsTrigger value="topics">Topics</TabsTrigger>
              <TabsTrigger value="entries">Entries</TabsTrigger>
            </TabsList>
            <TabsContent value="watchlists">
              Your public watchlists will be shown here.
            </TabsContent>
            <TabsContent value="topics">Your topics.</TabsContent>
            <TabsContent value="entries">Your entries.</TabsContent>
          </Tabs>
        </div>
      </Card>
    );
  }
  return (
    <main className="relative w-full">
      <div className="relative h-50 w-full rounded-lg overflow-hidden">
        <Image
          src="/images/default-user-cover-image.jpg"
          alt="Trader cover image"
          fill
          className="object-cover"
        />
      </div>

      <div className="absolute left-12 bottom-0">
        <Avatar className="w-36 h-36 border-4 border-background shadow-lg cursor-pointer transition">
          <AvatarImage src={parsedUser?.profile?.profile_picture || ""} />
          <AvatarFallback className="flex items-center justify-center bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-300">
            <FaUserCircle className="size-34" />
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="h-12" />
    </main>
  );
}
