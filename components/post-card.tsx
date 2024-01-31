import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";

interface PostCardProps {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  description: string;
};


export const PostCard = ({
  id,
  title,
  imageUrl,
  category,
  description
}: PostCardProps) => {
  

  return (
      <div className="group hover:shadow-sm overflow-hidden border rounded-lg p-3 m-5 h-full dark:border-[#ffffff]">
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium line-clamp-2">
            {title}
          </div>
          <p className="text-xs pb-2 text-muted-foreground text-[#000000] dark:text-[#ffffff]">
            {category}
          </p>
          <p className="text-xs pb-2 text-muted-foreground text-[#000000] dark:text-[#ffffff]">
            {description}
          </p>
          <div className="relative aspect-video rounded-md">
          <Image
            fill
            className="object-contain"
            alt={title}
            src={imageUrl}
          />
        </div>
        </div>
      </div>
  )
}