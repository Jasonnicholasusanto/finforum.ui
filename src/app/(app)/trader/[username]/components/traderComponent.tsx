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
import EditProfileModal from "./updateProfileModal";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { uploadProfilePicture } from "@/services/api/modules/me";
import { Loader2 } from "lucide-react";

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

  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState(
    parsedUser?.profile?.profile_picture || ""
  );

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await uploadProfilePicture(formData);
      setAvatarUrl(res.profile_picture_url);
    } catch (err) {
      console.error("Failed to upload profile picture", err);
    } finally {
      setUploading(false);
    }
  }

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
          <div
            className={`relative w-36 h-36 ${
              isOwner ? "cursor-pointer group" : ""
            }`}
            onClick={() => isOwner && fileInputRef.current?.click()}
          >
            <Avatar className="w-full h-full border-4 border-background rounded-full overflow-hidden">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback className="flex items-center justify-center bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-300">
                <FaUserCircle className="size-34" />
              </AvatarFallback>
            </Avatar>

            {isOwner && (
              <div className="absolute rounded-full inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm transition">
                <LuPencil size={28} />
              </div>
            )}

            {uploading && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-full">
                <Loader2 size={28} className="animate-spin text-white" />
              </div>
            )}
          </div>

          {isOwner && (
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
          )}
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
              Watchlists
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
