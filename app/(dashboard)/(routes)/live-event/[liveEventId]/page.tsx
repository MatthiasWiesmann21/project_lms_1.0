import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { File } from "lucide-react";

import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";

import { VideoPlayer } from "./_components/video-player";
import { getEvents } from "@/actions/get-events";
import { db } from "@/lib/db";


const LiveEventIdPage = async ({
  params
}: {
  params: { liveEventId: string; }
}) => {
  const { userId } = auth();
  

if (!userId) {
    return redirect("/");
} 

const liveEvent = await db.liveEvent.findUnique({
    where: {
        id: params.liveEventId,
        isPublished: true,
    }
})

if (!liveEvent) {
    return redirect("/")
}

  return ( 
    <div>
      <div className="flex flex-col max-w-5xl mx-auto pb-20">
        <div className="p-4"> 
        <VideoPlayer
          title={liveEvent.title}
          liveEventId={params.liveEventId}
          // @ts-ignore
          videoUrl={liveEvent.videoUrl} // Hier fügen wir die Vimeo-URL aus den chapter Daten hinzu.
        />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">
              {liveEvent.title}
            </h2>
          </div>
          <Separator />
          <div>
            <Preview value={liveEvent.description!} />
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default LiveEventIdPage;