import Image from "next/image";
import Link from "next/link";
import { BookOpen, PlayCircle } from "lucide-react";
import moment from "moment";

import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "@/components/course-progress";
import { CategoryItem } from "@/app/(dashboard)/(routes)/search/_components/category-item";
import { cn } from "@/lib/utils";

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

  const startDateTimeMoment = moment(startDateTime, "DD-MM-YY HH:mm");
  const endDateTimeMoment = moment(endDateTime, "DD-MM-YY HH:mm");

  const isStartDateToday = startDateTimeMoment.isSame(moment(), "day");
  const isEndDateToday = endDateTimeMoment.isSame(moment(), "hour");


  return (
    <Link href={`/live-event/${id}`}>
      <div className="group h-full overflow-hidden rounded-lg border p-2 transition hover:shadow-sm dark:border-[#ffffff]">
        <div className={cn("relative aspect-video w-full overflow-hidden rounded-md",
          isStartDateToday && "border-2 border-rose-500"
        )}>
          {isStartDateToday && (
          <p className="rounded-md flex p-1 text-white absolute top-2 left-2 z-10 dark:bg-rose-600 dark:text-white bg-rose-600">
            Live
          <PlayCircle className="pl-1"/></p>
          )}
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
