"use client";

import { Calendar } from "@/components/ui/calendar";

import * as React from "react";

const CalendarPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div>
      <h1>Calendar Page</h1>
      <p>In Development for Motu</p>
      <div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
    </div>
  );
};

export default CalendarPage;
