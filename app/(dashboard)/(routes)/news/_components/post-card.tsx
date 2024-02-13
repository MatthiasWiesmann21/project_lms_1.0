"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { UserAvatar } from "@/components/user-avatar";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface PostCardProps {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  description: string;
  createdAt: string;
  publisherName: string;
  publisherImageUrl: string;
};

interface Comment {
  id: string;
  text: string;
  createdAt: string;
  authorName: string; // Adjust according to your actual data structure
}

export const PostCard = async ({
  id,
  title,
  imageUrl,
  category,
  description,
  createdAt,
  publisherName,
  publisherImageUrl
}: PostCardProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

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
            <div className="text-lg md:text-base font-medium line-clamp-2 pt-5">
              {title}
            </div>
            <p className="text-xs pb-2 text-muted-foreground text-[#000000] dark:text-[#ffffff]">
              {category}
            </p>
          </div>
          <p className="text-sm pb-2 text-[#000000] dark:text-[#ffffff]">
            {description}
          </p>
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