"use client";
import { useState, useEffect } from "react";
import { DateandTime } from "./date&time";
import { Categories } from "./categories";
import { EventsList } from "@/components/events-list ";
import { useAuth } from "@clerk/nextjs";

const LiveEventWrapper = ({ liveEvents, categories, searchParams }: any) => {
  const { userId } = useAuth();
  const [liveEvent, setLiveEvent] = useState([]);

  useEffect(() => {
    setLiveEvent(liveEvents);
  }, []);

  return (
    <div className="space-y-4 p-6">
      <DateandTime
        setLiveEvent={setLiveEvent}
        getEvent={{
          userId,
          ...searchParams,
          containerId: process.env.CONTAINER_ID,
        }}
      />
      <Categories items={categories} />
      <EventsList items={liveEvent} />
    </div>
  );
};

export default LiveEventWrapper;
