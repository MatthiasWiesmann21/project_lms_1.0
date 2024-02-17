import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { TitleForm } from "./_components/title-form";
import { EventDescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";;
import { Actions } from "./_components/actions";
import { VideoForm } from "./_components/event-video-form";

const LiveEventIdPage = async ({
  params
}: {
  params: { liveEventId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const liveEvent = await db.liveEvent.findUnique({
    where: {
      id: params.liveEventId,
      containerId: process.env.CONTAINER_ID,
    },
  });

  const categories = await db.category.findMany({
    where: {
      containerId: process.env.CONTAINER_ID,
    },
    orderBy: {
      name: "asc",
    },
  });

  if (!liveEvent) {
    return redirect("/");
  }

  const requiredFields = [
    liveEvent.title,
    liveEvent.description,
    liveEvent.imageUrl,
    liveEvent.categoryId,
    liveEvent.videoUrl,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!liveEvent.isPublished && (
        <Banner
          label="This course is unpublished. It will not be visible to the students."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">
              Event Setup
            </h1>
            <span className="text-sm text-slate-700 dark:text-[#ffffff]">
              Complete all required fields {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            liveEventId={params.liveEventId}
            isPublished={liveEvent.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">
                Customize your Live Event
              </h2>
              <span className="pl-1 text-xs text-rose-600">*required</span>
            </div>
            <TitleForm
              initialData={liveEvent}
              liveEventId={liveEvent.id}
            />
            <EventDescriptionForm
              initialData={liveEvent}
              liveEventId={liveEvent.id}
            />
            <CategoryForm
              initialData={liveEvent}
              liveEventId={liveEvent.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">
                  Course chapters
                  <span className="pl-1 text-xs text-rose-600">*required</span>
                </h2>
              </div>
                <ImageForm
                  initialData={liveEvent}
                  liveEventId={liveEvent.id}
                />
                <VideoForm
                  initialData={liveEvent}
                  liveEventId={liveEvent.id} 
                />
            </div>
          </div>
        </div>
      </div>
    </>
   );
}
 
export default LiveEventIdPage;