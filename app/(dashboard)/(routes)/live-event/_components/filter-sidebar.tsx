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
  } from "@/components/ui/sheet"
import { DateandTime } from "./date&time";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";



const EventFilterSidebar = ({ liveEvents, categories, searchParams }: any) => {
    const { userId } = useAuth();
    const [liveEvent, setLiveEvent] = useState([]);
  
    useEffect(() => {
      setLiveEvent(liveEvents);
    }, []);

return ( 
    <Sheet>
        <SheetTrigger>
            <Button className="rounded-xl items-center justify-center" variant="default" size="lg">
                <Filter className="pr-1" size={28}/>
                Filter
            </Button>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </SheetDescription>
            </SheetHeader>
            <DateandTime
                setLiveEvent={setLiveEvent}
                getEvent={{
                  userId,
                  ...searchParams,
                  containerId: process.env.CONTAINER_ID,
                }}
                liveEvent={liveEvent}
            />
        </SheetContent>
    </Sheet>
     );
}
 
export default EventFilterSidebar;