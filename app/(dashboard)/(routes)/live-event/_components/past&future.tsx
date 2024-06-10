"use client";

import { useLanguage } from "@/lib/check-language";
import axios from "axios";
import { useRef, useState } from "react";

export const PastandFuture = ({
  setLiveEvent,
  getEvent,
  liveEvent,
}: {
  setLiveEvent: any;
  getEvent: any;
  liveEvent: any[];
}) => {
  const currentLanguage = useLanguage();
  const [state, setState] = useState("past");
  return (
    <div className="flex items-center justify-between">
      <div
        onClick={async () => {
          const response = await axios?.get(`/api/liveEvent`);
          setLiveEvent(
            response?.data?.filter(
              (each: any) => new Date(each?.startDateTime) > new Date()
            )
          );
          setState("future");
        }}
        className={`border-1 mr-2 flex cursor-pointer items-center justify-center p-1 text-gray-500 ${
          state === "future" && "border-b border-[#EA2088] text-white"
        } hover:border-b hover:border-[#EA2088] hover:text-white transition duration-500 ease-in-out`}
      >
        {currentLanguage.live_event_futureAndPast_button_text_future}
      </div>
      <div
        onClick={async () => {
          const response = await axios?.get(`/api/liveEvent`);
          setLiveEvent(
            response?.data?.filter(
              (each: any) => new Date(each?.startDateTime) < new Date()
            )
          );
          setState("past");
        }}
        className={`border-1 mr-2 flex cursor-pointer items-center justify-center p-1 text-gray-500 ${
          state === "past" && "border-b border-[#EA2088] text-white"
        } hover:border-b hover:border-[#EA2088] hover:text-white transition duration-500 ease-in-out`}
      >
        {currentLanguage.live_event_futureAndPast_button_text_past}
      </div>
    </div>
  );
};
