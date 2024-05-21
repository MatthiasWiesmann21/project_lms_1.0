import Image from "next/image";
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import moment from "moment";
import { CategoryItem } from "@/app/(dashboard)/(routes)/search/_components/category-item";
import { cn } from "@/lib/utils";

interface EventsCardProps {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  categoryColorCode: string;
  startDateTime: Date | null | any;
  endDateTime: Date | null | any;
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
  const isLive =
    new Date(startDateTime) <= new Date() &&
    new Date(
      new Date(endDateTime)?.setMinutes(new Date(endDateTime)?.getMinutes() + 1)
    ) >= new Date();

  return (
    <Link href={`/live-event/${id}`}>
      <div className="group h-full overflow-hidden rounded-lg border p-2 transition hover:shadow-sm dark:border-[#ffffff]">
        <div
          className={cn(
            "relative aspect-video w-full overflow-hidden rounded-md",
            isLive && "border-2 border-rose-500"
          )}
        >
          {isLive && (
            <p className="absolute left-2 top-2 z-10 flex rounded-md bg-rose-600 p-1 text-white dark:bg-rose-600 dark:text-white">
              Live
              <PlayCircle className="pl-1" />
            </p>
          )}
          <Image fill className="object-cover" alt={title} src={imageUrl} />
        </div>
        <div className="line-clamp-2 py-2 text-lg font-medium transition group-hover:text-sky-500 md:text-base">
          {title}
        </div>
        <div className="flex pt-2">
          <div className="flex flex-col">
            <div className="py-2">
              {/* @mathtias Fix this soon */}
              <CategoryItem label={category} colorCode={categoryColorCode} categoryAmmount={0} />
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center justify-evenly">
            <p className="text-xs">{`Starts: ${moment(startDateTime)?.format(
              "DD-MM-YY HH:mm"
            )}`}</p>
            <p className="text-xs">{`Ends: ${moment(endDateTime)?.format(
              "DD-MM-YY HH:mm"
            )}`}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
