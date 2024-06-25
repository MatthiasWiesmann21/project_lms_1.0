"use client";

import { useLanguage } from "@/lib/check-language";
import axios from "axios";
import { useState } from "react";

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
        className={`border-1 font-semibold mr-2 flex cursor-pointer items-center justify-center p-1 text-gray-600 dark:text-white ${
          state === "future" && "border-b-2 border-[#EA2088] text-black"
        } hover:border-b-2 hover:border-[#EA2088] hover:text-gray-600 dark:hover:text-white transition duration-500 ease-in-out`}
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
        className={`border-1 mr-2 font-semibold flex cursor-pointer items-center justify-center p-1 text-gray-600 dark:text-white ${
          state === "past" && "border-b-2 border-[#EA2088] text-black"
        } hover:border-b-2 hover:border-[#EA2088] hover:text-gray-600 dark:hover:text-white transition duration-500 ease-in-out`}
      >
        {currentLanguage.live_event_futureAndPast_button_text_past}
      </div>
    </div>
  );
};
