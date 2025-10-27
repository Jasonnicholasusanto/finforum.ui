"use client";

import Image from "next/image";
import { useAppContext } from "@/contexts/app-context-provider";
import { User } from "@/models/user";
import { UserPublicResponse } from "@/models/publicUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUserCircle } from "react-icons/fa";
import { Card } from "@/components/ui/card";
import { LuPencil } from "react-icons/lu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import EditProfileModal from "./updateProfileModal";
import { Button } from "@/components/ui/button";

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
          {isOwner && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-4 bg-black/30 hover:bg-black/40 text-white"
            >
              <LuPencil />
            </Button>
          )}
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
                {isOwner
                  ? `Trader @ ${user?.profile.username}`
                  : `Trader @ ${profile.profile.username}`}
              </p>
              <p className="text-neutral-400">
                {isOwner
                  ? `${user?.profile.full_name || user?.profile.display_name}`
                  : `${
                      profile?.profile.full_name ||
                      profile?.profile.display_name
                    }`}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-8">
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">
                  {isOwner
                    ? `${user?.followers_count ?? 0}`
                    : `${profile.followers_count ?? 0}`}
                </span>
                <span className="text-neutral-400 text-sm">Followers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">
                  {isOwner
                    ? `${user?.following_count ?? 0}`
                    : `${profile.following_count ?? 0}`}
                </span>
                <span className="text-neutral-400 text-sm">Following</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">
                  {isOwner
                    ? `${user?.activity.total_points ?? 0}`
                    : `${profile?.activityPointsBreakdown?.total_points ?? 0}`}
                </span>
                <span className="text-neutral-400 text-sm">Total points</span>
              </div>
            </div>
            {user?.profile.bio && (
              <p className="mt-2">
                {isOwner ? `${user.profile.bio}` : `${profile.profile.bio}`}
              </p>
            )}
          </div>
          {isOwner && <EditProfileModal />}
        </div>
      </div>
      <div className="px-8 mt-6">
        <Tabs defaultValue="watchlists" variant="outline" className="w-full">
          <TabsList variant="outline">
            <TabsTrigger variant="outline" value="watchlists">
              Public Watchlists
            </TabsTrigger>
            <TabsTrigger variant="outline" value="topics">
              Topics
            </TabsTrigger>
            <TabsTrigger variant="outline" value="entries">
              Entries
            </TabsTrigger>
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
