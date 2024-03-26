"use client";

import UniversalPlayer from "@/pages/components/universalPlayer";
import Timer from "./timer";
import { useEffect, useState } from "react";
import moment from "moment";

interface VideoPlayerProps {
  playbackId?: string;
  videoUrl: string;
  startDateTime: any;
  endDateTime: any;
}

const calculateTimeRemaining = (date: any) => {
  const currentDate = moment();
  const difference = moment?.duration(
    moment(date, "ddd MMM DD YYYY HH:mm:ss ZZ")?.diff(currentDate)
  );
  return {
    days: difference?.days(),
    hours: difference?.hours(),
    minutes: difference?.minutes(),
    seconds: difference?.seconds(),
  };
};

export const VideoPlayer = ({
  videoUrl,
  startDateTime,
  endDateTime,
}: VideoPlayerProps) => {
  const [timeRemaining, setTimeRemaining] = useState(
    calculateTimeRemaining(startDateTime)
  );

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(startDateTime));
      if (
        timeRemaining?.days <= 0 &&
        timeRemaining?.hours <= 0 &&
        timeRemaining?.minutes <= 0 &&
        timeRemaining?.seconds <= 0
      )
        clearInterval(timerInterval); // Stop the timer
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  if (!videoUrl) {
    console.error("URL is not provided!");
    return null;
  }

  return (
    <div className="relative aspect-video">
      {(!(
        timeRemaining?.days <= 0 &&
        timeRemaining?.hours <= 0 &&
        timeRemaining?.minutes <= 0 &&
        timeRemaining?.seconds <= 0
      ) ||
        new Date(endDateTime) < new Date()) && (
        <Timer timeRemaining={timeRemaining} endDateTime={endDateTime} />
      )}
      <UniversalPlayer url={videoUrl} />
    </div>
  );
};
