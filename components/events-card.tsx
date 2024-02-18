import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "@/components/course-progress";
import { CategoryItem } from "@/app/(dashboard)/(routes)/search/_components/category-item";

interface EventsCardProps {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  categoryColorCode: string;
};


export const EventCard = ({
  id,
  title,
  imageUrl,
  category,
  categoryColorCode
}: EventsCardProps) => {
  

  return (
    <Link href={`/live-event/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full dark:border-[#ffffff]">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            fill
            className="object-cover"
            alt={title}
            src={imageUrl}
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-500 transition line-clamp-2">
            {title}
          </div>
          <div className="py-2">
              <CategoryItem
                label={category}
                colorCode={categoryColorCode}
              />
          </div>

        </div>
      </div>
    </Link>
  )
}