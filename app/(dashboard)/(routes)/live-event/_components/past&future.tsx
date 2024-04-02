"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/check-language";
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
  const currentLanguage = useLanguage();

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
          className="border-1 cursor-pointer rounded-xl border border-[#fff] px-2 w-[148px] mr-2"
          variant="ghost"
          size="lg"
        >
          {currentLanguage.live_event_futureAndPast_button_text_future}
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
          className="border-1 cursor-pointer rounded-xl border border-[#fff] p-1 px-2 w-[148px] mr-2"
          variant="ghost"
          size="lg"
        >
          {currentLanguage.live_event_futureAndPast_button_text_past}
        </Button>
    </div>
    </div>
  );
};
