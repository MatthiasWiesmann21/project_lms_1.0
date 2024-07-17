"use client";
import { useState, useEffect } from "react";
import { Categories } from "./categories";
import { EventsList } from "@/components/events-list ";
import { useAuth } from "@clerk/nextjs";
import EventFilterSidebar from "./filter-sidebar";
import { PastandFuture } from "./past&future";

const LiveEventWrapper = ({
  liveEvents,
  categories,
  searchParams,
  container,
}: any) => {
  const { userId } = useAuth();
  const [liveEvent, setLiveEvent] = useState([]);

  useEffect(() => {
    setLiveEvent(liveEvents);
  }, [liveEvents]);

  return (
    <div className="space-y-4 p-4">
      <div className="mr-1 flex justify-between">
        <PastandFuture
          setLiveEvent={setLiveEvent}
          getEvent={{
            userId,
            ...searchParams,
            containerId: process.env.CONTAINER_ID,
          }}
          liveEvent={liveEvent}
        />
        <EventFilterSidebar liveEvents={liveEvent} setLiveEvent={setLiveEvent} colors={container} categories={undefined} searchParams={undefined} />
      </div>
      <Categories
        items={categories}
        defaultColor={container?.navDarkBackgroundColor}
      />
      <EventsList
        items={liveEvent?.map((each: any) => ({
          ...each,
          color: container?.navDarkBackgroundColor,
        }))}
      />
    </div>
  );
};

export default LiveEventWrapper;
