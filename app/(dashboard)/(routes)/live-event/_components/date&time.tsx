"use client";

import { useState } from "react";

export const DateandTime = () => {
  const [firstDateTime, setFirstDateTime] = useState({
    time: "",
    date: "",
  });
  const [secondDateTime, setSecondDateTime] = useState({
    time: "",
    date: "",
  });

  const handleFIrstTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstDateTime((prevDateTime) => ({
      ...prevDateTime,
      time: event.target.value,
    }));
  };
  const handleSecondTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSecondDateTime((prevDateTime) => ({
      ...prevDateTime,
      time: event.target.value,
    }));
  };

  const handleFirstDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstDateTime((prevDateTime) => ({
      ...prevDateTime,
      date: event.target.value,
    }));
  };
  const handleSecondDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSecondDateTime((prevDateTime) => ({
      ...prevDateTime,
      date: event.target.value,
    }));
  };

  return (
    <div className="flex justify-end gap-2">
      <div>
        <input
          type="time"
          value={firstDateTime.time}
          onChange={handleFIrstTimeChange}
        />
        <input
          type="date"
          value={firstDateTime.date}
          onChange={handleFirstDateChange}
        />
      </div>
      <div>
        <input
          type="time"
          value={secondDateTime.time}
          onChange={handleSecondTimeChange}
        />
        <input
          type="date"
          value={secondDateTime.date}
          onChange={handleSecondDateChange}
        />
      </div>
    </div>
  );
};
