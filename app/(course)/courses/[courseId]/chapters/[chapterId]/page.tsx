import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { File } from "lucide-react";

import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";

import { VideoPlayer } from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { CourseProgressButton } from "./_components/course-progress-button";
import { getProgress } from "@/actions/get-progress";
import { CourseSidebar } from "../../_components/course-sidebar";
import { db } from "@/lib/db";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { chapter, course, attachments, nextChapter, userProgress, purchase } =
    await getChapter({
      userId,
      chapterId: params.chapterId,
      courseId: params.courseId,
    });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  const _course = await db?.course?.findUnique({
    where: {
      id: params.courseId,
      containerId: process.env.CONTAINER_ID,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!_course) {
    return redirect("/");
  }

  const progressCount = await getProgress(userId, _course?.id);

  return (
    <div className="flex justify-between">
      <div className="mx-3 w-full">
        {userProgress?.isCompleted && (
          <Banner
            variant="success"
            label="You already completed this chapter."
          />
        )}
        {isLocked && (
          <Banner
            variant="warning"
            label="You need to purchase this course to watch this chapter."
          />
        )}
        <div className="mx-auto flex flex-col pb-20">
          <div className="p-4">
            <VideoPlayer
              videoUrl={chapter.videoUrl || ""}
              title={chapter.title}
              isLocked={isLocked}
              completeOnEnd={completeOnEnd}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
          <div>
            <div className="flex flex-col items-center justify-between p-4 md:flex-row">
              <h2 className="mb-2 text-2xl font-semibold">{chapter.title}</h2>
              {purchase ? (
                <CourseProgressButton
                  chapterId={params.chapterId}
                  courseId={params.courseId}
                  nextChapterId={nextChapter?.id}
                  isCompleted={!!userProgress?.isCompleted}
                />
              ) : (
                <CourseEnrollButton
                  courseId={params.courseId}
                  price={course.price!}
                />
              )}
            </div>
            <Separator />
            <div>
              <Preview value={chapter.description!} />
            </div>
            {!!attachments.length && (
              <>
                <Separator />
                <div className="p-4">
                  {attachments.map((attachment) => (
                    <a
                      href={attachment.url}
                      target="_blank"
                      key={attachment.id}
                      className="flex w-full items-center rounded-md border bg-sky-200 p-3 text-sky-700 hover:underline"
                    >
                      <File />
                      <p className="line-clamp-1">{attachment.name}</p>
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="h-[300px] min-w-[370px] max-w-[370px]">
        <CourseSidebar course={_course} progressCount={progressCount} />
      </div>
    </div>
  );
};

export default ChapterIdPage;
