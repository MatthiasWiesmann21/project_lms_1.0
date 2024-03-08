import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { File, PlayCircle } from "lucide-react";

import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";

import { VideoPlayer } from "./_components/video-player";
import { getEvents } from "@/actions/get-events";
import { db } from "@/lib/db";
import moment from "moment";
import { CategoryItem } from "../_components/category-item";
import Chat from "./_components/chat";

const LiveEventIdPage = async ({
  params,
}: {
  params: { liveEventId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const liveEvent = await db.liveEvent.findUnique({
    where: {
      id: params.liveEventId,
      isPublished: true,
    },
  });

  const category = await db.category.findUnique({
    where: {
      id: liveEvent?.categoryId ?? undefined,
      isPublished: true,
      isLiveEventCategory: true,
    },
  });

  if (!liveEvent) {
    return redirect("/");
  }

  const startDateTimeMoment = moment(liveEvent.startDateTime, "DD-MM-YY HH:mm");
  const endDateTimeMoment = moment(liveEvent.endDateTime, "DD-MM-YY HH:mm");

  const isStartDateToday = true;
  const isEndDateToday = endDateTimeMoment.isSame(moment(), "hour");

  return (
    <div className="flex items-center justify-around">
      <div className="flex w-[60%] flex-col pb-20">
        <div className="flex flex-col items-end justify-between p-4 pt-6 md:flex-row">
          <CategoryItem
            label={category?.name ?? ""}
            colorCode={category?.colorCode ?? ""}
          />
          <div className="flex flex-1 flex-col items-end pr-1">
            <p className="text-xs">{`Starts: ${moment(
              liveEvent.startDateTime
            )?.format("DD-MM-YY HH:mm")}`}</p>
            <p className="text-xs">{`Ends: ${moment(
              liveEvent.endDateTime
            )?.format("DD-MM-YY HH:mm")}`}</p>
          </div>
        </div>
        <div className="p-4">
          <VideoPlayer
            title={liveEvent.title}
            liveEventId={params.liveEventId}
            // @ts-ignore
            videoUrl={liveEvent.videoUrl} // Hier fügen wir die Vimeo-URL aus den chapter Daten hinzu.
          />
        </div>

        <div>
          <div className="flex flex-col items-center justify-between p-4 md:flex-row">
            <h2 className="mb-2 text-2xl font-semibold">{liveEvent.title}</h2>
          </div>
          <Separator />
          <div>
            <Preview value={liveEvent.description!} />
          </div>
        </div>
      </div>
      <Chat />
    </div>
  );
};

export default LiveEventIdPage;
