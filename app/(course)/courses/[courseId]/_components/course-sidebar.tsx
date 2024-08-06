import { auth } from "@clerk/nextjs";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { db } from "@/lib/db";
import { CourseProgress } from "@/components/course-progress";

import { CourseSidebarItem } from "./course-sidebar-item";
import { Line } from "rc-progress";
import Progress from "./progress";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const CourseSidebar = async ({
  course,
  progressCount,
}: CourseSidebarProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const purchase = await db?.purchase?.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course?.id,
      },
    },
  });

  const progress =
    course?.chapters?.reduce(
      (acc: any, val: any) => acc + (val?.userProgress[0]?.progress || 0),
      0
    ) / course?.chapters?.length;

  // console.log("======", progress);

  return (
    <TooltipProvider>
      <div className="m-3 flex h-full flex-col overflow-y-auto rounded-xl border-r bg-slate-100/60 shadow-sm dark:bg-[#0c0319]">
        <div className="flex flex-col border-b p-7">
          <h1 className="mb-2 font-semibold">{course?.title}</h1>
          <Progress progress={progress} />
          {purchase && (
            <div className="mt-10">
              <CourseProgress variant="success" value={progressCount} />
            </div>
          )}
        </div>
        <div className="flex w-full flex-col">
          {course?.chapters?.map((chapter) => (
            <CourseSidebarItem
              key={chapter?.id}
              id={chapter?.id}
              label={chapter?.title}
              isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
              courseId={course.id}
              isLocked={!chapter.isFree && !purchase}
            />
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};
