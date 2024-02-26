import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import moment from "moment";

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
  startDateTime: Date | null;
  endDateTime: Date | null;
}

export const EventCard = ({
  id,
  title,
  imageUrl,
  category,
  categoryColorCode,
  startDateTime,
  endDateTime,
}: EventsCardProps) => {
  return (
    <Link href={`/live-event/${id}`}>
      <div className="group h-full overflow-hidden rounded-lg border p-3 transition hover:shadow-sm dark:border-[#ffffff]">
        <div className="relative aspect-video w-full overflow-hidden rounded-md">
          <Image fill className="object-cover" alt={title} src={imageUrl} />
        </div>
        <div className="flex pt-2">
          <div className="flex flex-col">
            <div className="line-clamp-2 text-lg font-medium transition group-hover:text-sky-500 md:text-base">
              {title}
            </div>
            <div className="py-2">
              <CategoryItem label={category} colorCode={categoryColorCode} />
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center justify-evenly pt-6">
            <p className="text-xs">{`Starts: ${moment(
              startDateTime
            )?.format("DD-MM-YY HH:mm")}`}</p>
            <p className="text-xs">{`Ends: ${moment(endDateTime)?.format(
              "DD-MM-YY HH:mm"
            )}`}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
