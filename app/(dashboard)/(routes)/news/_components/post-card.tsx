import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { UserAvatar } from "@/components/user-avatar";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { useState } from "react";
import LikeComment from "./likeComment";

interface PostCardProps {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  description: string;
  createdAt: string;
  publisherName: string;
  publisherImageUrl: string;
  colorCode?: string;
  likesCount: number;
  currentLike: boolean;
  commentsWithLikes: any;
}

export const PostCard = async ({
  id,
  title,
  imageUrl,
  category,
  description,
  createdAt,
  publisherName,
  publisherImageUrl,
  colorCode,
  likesCount,
  currentLike,
  commentsWithLikes,
}: PostCardProps) => {
  return (
    <div className="group m-5 h-full overflow-hidden rounded-lg border p-3 hover:shadow-sm dark:border-[#ffffff]">
      <div className="group h-full overflow-hidden rounded-lg border p-3 hover:shadow-sm dark:border-[#ffffff]">
        <div className="flex flex-col pt-2">
          <div className="item-start flex gap-4">
            <UserAvatar src={publisherImageUrl} />
            <div className="flex flex-col justify-center">
              <p className="text-md font-semibold text-black dark:text-white">
                {publisherName}
              </p>
              <p className="pb-4 text-xs text-black text-muted-foreground dark:text-white">
                {createdAt}
              </p>
            </div>
          </div>
          <Separator />
          <div className="mt-2 flex w-fit items-center gap-x-2 rounded-full border border-slate-300 px-1 py-1 pr-2 text-xs">
            {colorCode && (
              <div
                style={{ backgroundColor: colorCode }}
                className="h-5 w-5 rounded-full"
              />
            )}
            <div className="truncate">{category}</div>
          </div>
          <div className="text-lg font-bold md:text-lg">{title}</div>
        </div>
        <div>
          <Preview value={description!} />
        </div>
        <div className="relative aspect-video rounded-md p-2">
          <Image fill className="object-contain" alt={title} src={imageUrl} />
        </div>
      </div>
      <LikeComment
        id={id}
        likesCount={likesCount}
        currentLike={currentLike}
        commentsWithLikes={commentsWithLikes}
      />
    </div>
  );
};
