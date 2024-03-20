"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import moment from "moment";
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
    </div>
  );
};
