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
  commentsCount: number;
  updateLikeComment: any;
}

export const PostCard = ({
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
  commentsCount,
  updateLikeComment,
}: PostCardProps) => (
  <div className="group my-5 h-full overflow-hidden rounded-lg border bg-[#f6f8fa] py-1 hover:shadow-sm dark:border-[#2e3135] dark:bg-[#1b1f23]">
    <div className="group h-full overflow-hidden hover:shadow-sm">
      <div className="m-5 flex flex-col">
        <div
          className="flex items-start justify-between"
          // style={{ border: "2px solid red" }}
        >
          <div
            // style={{ border: "2px solid blue" }}
            className="flex items-center"
          >
            <UserAvatar
              src={publisherImageUrl}
              className="max-h-[64px] min-h-[64px] min-w-[64px] max-w-[64px]"
            />
            <div
              className="ml-2 flex flex-col justify-center"
              // style={{ border: "3px solid green" }}
            >
              <div className="font-600 text-[16px] text-black dark:text-white">
                {publisherName}
              </div>
              <div className="text-xs text-black text-muted-foreground dark:text-white">
                European Fintech | Business Consulting
              </div>
              <div className="text-xs text-black text-muted-foreground dark:text-white">
                {createdAt}
              </div>
            </div>
          </div>
          <div
            className={`flex items-center gap-x-1 rounded-full border border-slate-300 px-3 py-1 text-[12px] font-[600] transition hover:border-sky-700`}
            style={{ borderColor: colorCode }}
          >
            <div className="truncate">{category}</div>
          </div>
        </div>
        <div
          // style={{ border: "2px solid indigo" }}
          className="font-400 mt-5 text-[16px]"
        >
          {description}
        </div>
        {/* <div></div> */}
        {/* <Separator /> */}
        {/* {colorCode && (
          <div className="mt-2 flex w-fit items-center gap-x-2 rounded-full border border-slate-300 px-1 py-1 pr-2 text-xs">
            <div
              style={{ backgroundColor: colorCode }}
              className="h-5 w-5 rounded-full"
            />
            <div className="truncate">{category}</div>
          </div>
        )} */}
        {/* <div className="text-lg font-bold md:text-lg">{title}</div> */}
      </div>
      {/* <div>
        <Preview value={description!} />
      </div> */}
      {imageUrl && (
        <div
          className="relative aspect-video w-full rounded-md p-2"
          // style={{ border: "2px solid purple" }}
        >
          <Image
            fill
            // className="w-full object-contain"
            className="cover"
            alt={title}
            src={imageUrl}
          />
        </div>
      )}
    </div>
    <LikeComment
      id={id}
      likesCount={likesCount}
      currentLike={currentLike}
      commentsWithLikes={commentsWithLikes}
      commentsCount={commentsCount}
      updateLikeComment={updateLikeComment}
    />
  </div>
);
