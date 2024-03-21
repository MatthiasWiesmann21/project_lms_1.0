"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/check-language";
import axios from "axios";
import moment from "moment";
import { useRef, useState } from "react";

export const DateandTime = ({
  setLiveEvent,
  getEvent,
  liveEvent,
}: {
  setLiveEvent: any;
  getEvent: any;
  liveEvent: any[];
}) => {
  const endDateInputRef = useRef(null);
  const startDateInputRef = useRef(null);
  const [startDateTime, setStartDateTime] = useState<Date | undefined>();
  const [endDateTime, setEndDateTime] = useState<Date | undefined>();
  const currentLanguage = useLanguage();

  return (
    <div className="flex flex-col w-full space-y-4 mt-4">
      <div className="flex flex-col items-start gap-2">
        <div className="relative overflow-hidden w-full mb-2">
          <input
            type="datetime-local"
            ref={startDateInputRef}
            className="absolute -z-[1] w-full"
            onChange={(e) => {
              setStartDateTime(new Date(e?.target?.value));
            }}
          />
          <input
            // @ts-ignore
            onClick={() => startDateInputRef?.current?.showPicker()}
            type="text"
            placeholder={currentLanguage.live_event_filter_start_date}
            value={
              startDateTime
                ? moment(startDateTime)?.format("YYYY-MM-DD HH:mm")
                : ""
            }
            className="border-1 z-[1] cursor-pointer rounded border w-full border-white px-2"
          />
        </div>
        <div className="relative overflow-hidden w-full mb-2">
          <input
            type="datetime-local"
            ref={endDateInputRef}
            className="absolute -z-[1] w-full"
            onChange={(e) => {
              setEndDateTime(new Date(e?.target?.value));
            }}
          />
          <input
            // @ts-ignore
            onClick={() => endDateInputRef?.current?.showPicker()}
            type="text"
            placeholder={currentLanguage.live_event_filter_end_date}
            value={
              endDateTime ? moment(endDateTime)?.format("YYYY-MM-DD HH:mm") : ""
            }
            className="border-1 z-[1] cursor-pointer rounded border w-full border-white px-2"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={async () => {
            const response = await axios?.post(`/api/liveEvent/filter`, {
              ...getEvent,
              startDateTime,
              endDateTime,
            });
            setLiveEvent(response?.data);
          }}
          className="border-1 cursor-pointer rounded border border-[#fff] p-1 px-2"
        >
          {currentLanguage.live_event_filter_applyFilter_button_text}
        </button>
        <button
          onClick={async () => {
            const response = await axios?.get(`/api/liveEvent`);
            setLiveEvent(response?.data);
          }}
          className="border-1 cursor-pointer rounded border border-[#fff] p-1 px-2"
        >
          {currentLanguage.live_event_filter_clearFilter_button_text}
        </button>
      </div>
    </div>
  );
};
