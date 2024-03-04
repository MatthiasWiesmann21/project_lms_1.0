"use client";

import axios from "axios";
import moment from "moment";
import { useState } from "react";

export const DateandTime = ({
  setLiveEvent,
  getEvent,
}: {
  setLiveEvent: any;
  getEvent: any;
}) => {
  const [startDateTime, setStartDateTime] = useState<Date | undefined>(
    new Date()
  );
  const [endDateTime, setEndDateTime] = useState<Date | undefined>(new Date());

  return (
    <div className="flex items-center justify-end gap-2">
      <div>
        <input
          type="datetime-local"
          className="border-1 cursor-pointer rounded border border-white px-2"
          placeholder={moment(startDateTime)?.format("YYYY-MM-DDTHH:MM:SS")}
          value={moment(startDateTime)?.format("YYYY-MM-DDTHH:MM:SS")}
          onChange={(e) => {
            setStartDateTime(new Date(e?.target?.value));
          }}
        />
      </div>
      <div>
        <input
          type="datetime-local"
          className="border-1 cursor-pointer rounded border border-white px-2"
          placeholder={moment(endDateTime)?.format("YYYY-MM-DDTHH:MM:SS")}
          value={moment(endDateTime)?.format("YYYY-MM-DDTHH:MM:SS")}
          onChange={(e) => {
            setEndDateTime(new Date(e?.target?.value));
          }}
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
  );
};
