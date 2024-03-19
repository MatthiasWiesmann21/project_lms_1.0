"use client";

import { Button } from "@/components/ui/button";
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

  return (
    <div className="flex items-center justify-between">
      <div className="">
      <Button
          onClick={async () => {
            const response = await axios?.get(`/api/liveEvent`);
            setLiveEvent(
              response?.data?.filter(
                (each: any) => new Date(each?.startDateTime) > new Date()
              )
            );
          }}
          className="border-1 cursor-pointer rounded-xl border border-[#fff] px-2 w-[128px] mr-2"
          variant="ghost"
          size="lg"
        >
          Future Events
        </Button>
        <Button
          onClick={async () => {
            const response = await axios?.get(`/api/liveEvent`);
            setLiveEvent(
              response?.data?.filter(
                (each: any) => new Date(each?.startDateTime) < new Date()
              )
            );
          }}
          className="border-1 cursor-pointer rounded-xl border border-[#fff] p-1 px-2 w-[128px]"
          variant="ghost"
          size="lg"
        >
          Past Events
        </Button>
      </div>
      <div className="flex items-center gap-1">
        <div className="relative overflow-hidden">
          <input
            type="datetime-local"
            ref={startDateInputRef}
            className="absolute -z-[1]"
            onChange={(e) => {
              setStartDateTime(new Date(e?.target?.value));
            }}
          />
          <input
            // @ts-ignore
            onClick={() => startDateInputRef?.current?.showPicker()}
            type="text"
            placeholder="Select Start Date"
            value={
              startDateTime
                ? moment(startDateTime)?.format("YYYY-MM-DD HH:mm")
                : ""
            }
            className="border-1 z-[1] cursor-pointer rounded border border-white px-2"
          />
        </div>
        <div className="relative overflow-hidden">
          <input
            type="datetime-local"
            ref={endDateInputRef}
            className="absolute -z-[1]"
            onChange={(e) => {
              setEndDateTime(new Date(e?.target?.value));
            }}
          />
          <input
            // @ts-ignore
            onClick={() => endDateInputRef?.current?.showPicker()}
            type="text"
            placeholder="Select End Date"
            value={
              endDateTime ? moment(endDateTime)?.format("YYYY-MM-DD HH:mm") : ""
            }
            className="border-1 z-[1] cursor-pointer rounded border border-white px-2"
          />
        </div>
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
          Apply Filter
        </button>
        <button
          onClick={async () => {
            const response = await axios?.get(`/api/liveEvent`);
            setLiveEvent(response?.data);
          }}
          className="border-1 cursor-pointer rounded border border-[#fff] p-1 px-2"
        >
          Clear Filter
        </button>
      </div>
    </div>
  );
};
