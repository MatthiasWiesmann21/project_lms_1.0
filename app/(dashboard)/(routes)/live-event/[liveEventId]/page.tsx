"use client";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { VideoPlayer } from "./_components/video-player";
import moment from "moment";
import { CategoryItem } from "../_components/category-item";
import Chat from "./_components/chat";
import EventModal from "./_components/eventModal";
import Like from "./_components/like";
import { useEffect, useState } from "react";
import axios from "axios";

const LiveEventIdPage = ({ params }: { params: { liveEventId: string } }) => {
  const { userId } = useAuth();
  const [liveEvent, setLiveEvent] = useState<any>();
  const [category, setCategory] = useState<any>();

  const getLiveEvent = async () => {
    const response = await axios?.get(`/api/liveEvent/${params?.liveEventId}`, {
      params: { liveEventId: params?.liveEventId },
    });
    setLiveEvent(response?.data?.liveEvent);
    setCategory(response?.data?.category);
  };

  useEffect(() => {
    getLiveEvent();
  }, []);

  // const liveEvent = await db.liveEvent.findUnique({
  //   where: {
  //     id: params.liveEventId,
  //     isPublished: true,
  //   },
  // });

  // const category = await db.category.findUnique({
  //   where: {
  //     id: liveEvent?.categoryId ?? undefined,
  //     isPublished: true,
  //     isLiveEventCategory: true,
  //   },
  // });

  // const liveEvent = {
  //   id: "ca753dee-ae07-48a9-8677-a4ed86a722cb",
  //   userId: "user_2cPlDKbzzpYor9eUrapztp45Yfz",
  //   title: "Developing event without seconds",
  //   description: "<p>test</p>",
  //   imageUrl:
  //     "https://utfs.io/f/16fd6aaf-800e-42be-ab57-369d68575bf0-qh8o2u.jpg",
  //   videoUrl: "https://youtube.com/watch?v=txgpRWxCi2Y",
  //   isPublished: true,
  //   containerId: "5d20a598-f941-4039-a74c-ddb992e24adf",
  //   categoryId: "87648c92-8017-481d-b04a-2e4cf07a3dc6",
  //   createdAt: "2024-03-11T12:45:08.075Z",
  //   updatedAt: "2024-03-27T15:50:34.186Z",
  //   startDateTime: "2024-03-27T15:51:00.000Z",
  //   endDateTime: "2024-03-27T15:52:00.000Z",
  // };

  // const category = {
  //   id: "87648c92-8017-481d-b04a-2e4cf07a3dc6",
  //   name: "Lino Category",
  //   colorCode: "#ff1100",
  //   isPublished: true,
  //   isCourseCategory: true,
  //   isNewsCategory: false,
  //   isLiveEventCategory: true,
  //   containerId: "5d20a598-f941-4039-a74c-ddb992e24adf",
  //   createdAt: "2024-02-13T20:08:44.320Z",
  //   updatedAt: "2024-02-23T08:41:00.592Z",
  // };

  if (!userId) {
    return redirect("/");
  }

  // if (!liveEvent) {
  //   return redirect("/");
  // }

  // console.log("=============", liveEvent, category);

  // const startDateTimeMoment = moment(liveEvent.startDateTime, "DD-MM-YY HH:mm");
  // const endDateTimeMoment = moment(liveEvent.endDateTime, "DD-MM-YY HH:mm");

  // const isStartDateToday = true;
  // const isEndDateToday = endDateTimeMoment.isSame(moment(), "hour");

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
              liveEvent?.startDateTime
            )?.format("DD-MM-YY HH:mm")}`}</p>
            <p className="text-xs">{`Ends: ${moment(
              liveEvent?.endDateTime
            )?.format("DD-MM-YY HH:mm")}`}</p>
          </div>
        </div>
        <div className="p-4">
          <VideoPlayer
            // @ts-ignore remove this
            liveEventId={params.liveEventId}
            // @ts-ignore
            videoUrl={liveEvent?.videoUrl} // Hier fügen wir die Vimeo-URL aus den chapter Daten hinzu.
            startDateTime={liveEvent?.startDateTime}
            endDateTime={liveEvent?.endDateTime}
          />
          <EventModal
            liveEventId={liveEvent?.id}
            endDateTime={liveEvent?.endDateTime}
            getLiveEvent={getLiveEvent}
            isEnded={liveEvent?.isEnded}
          />
          <Like liveEvent={liveEvent} getLiveEvent={getLiveEvent} />
        </div>

        <div>
          <div className="flex flex-col items-center justify-between p-4 md:flex-row">
            <h2 className="mb-2 text-2xl font-semibold">{liveEvent?.title}</h2>
          </div>
          <Separator />
          <div>
            <Preview value={liveEvent?.description!} />
          </div>
        </div>
      </div>
      <Chat />
    </div>
  );
};

export default LiveEventIdPage;
