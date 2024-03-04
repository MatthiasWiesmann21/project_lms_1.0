import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { UserAvatar } from "@/components/user-avatar";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";

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
};

export const PostCard = async ({
  id,
  title,
  imageUrl,
  category,
  description,
  createdAt,
  publisherName,
  publisherImageUrl,
  colorCode
}: PostCardProps) => {

  return (
      <div className="group hover:shadow-sm overflow-hidden border rounded-lg p-3 m-5 h-full dark:border-[#ffffff]">
        <div className="flex flex-col pt-2">
          <div className="flex gap-4 item-start">
            <UserAvatar src={publisherImageUrl}/>
          <div className="flex flex-col justify-center">
            <p className="font-semibold text-md text-black dark:text-white">
               {publisherName}
            </p>
            <p className="text-xs pb-4 text-muted-foreground text-black dark:text-white">
              {createdAt}
            </p>
          </div>
          
          </div>
          <Separator />
          <div className="py-1 px-1 mt-2 pr-2 text-xs border border-slate-300 rounded-full flex items-center gap-x-2 w-fit">
          {colorCode && (
            <div
              style={{ backgroundColor: colorCode }}
              className="rounded-full w-5 h-5"
              />
              )}
            <div className="truncate">
              {category}
            </div>
          </div>
          <div className="text-lg md:text-lg font-bold">
            {title}
          </div>
          </div>
          <div>
          <Preview value={description!} />
          </div>
          <div className="relative aspect-video rounded-md p-2">
          <Image
            fill
            className="object-contain"
            alt={title}
            src={imageUrl}
          />
        </div>
        </div>
  )
}