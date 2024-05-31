"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DateandTime } from "./date&time";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { useLanguage } from "@/lib/check-language";

const EventFilterSidebar = ({
  liveEvents,
  categories,
  searchParams,
  setLiveEvent,
}: any) => {
  const { userId } = useAuth();
  const currentLanguage = useLanguage();

  return (
    <Sheet>
      <SheetTrigger>
        <Button
          className="border-5 h-[50px] w-[110px] items-center justify-center rounded-full border border-[#EA2088] bg-transparent text-white dark:hover:text-black hover:bg-[#EA2088] transition duration-500 ease-in-out"
          variant="default"
          size="sm"
        >
          <SlidersHorizontal className="pr-1 hover:text-black" size={28} />
          {currentLanguage.live_event_filter_button_text}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{currentLanguage.live_event_filter_title}</SheetTitle>
          <SheetDescription>
            {currentLanguage.live_event_filter_description}
          </SheetDescription>
        </SheetHeader>
        <DateandTime
          setLiveEvent={setLiveEvent}
          getEvent={{
            userId,
            ...searchParams,
            containerId: process.env.CONTAINER_ID,
          }}
          liveEvent={liveEvents}
        />
      </SheetContent>
    </Sheet>
  );
};

export default EventFilterSidebar;
