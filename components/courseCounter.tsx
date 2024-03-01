"use client";

import { useIsAdmin } from "@/lib/roleCheck";
import { Infinity, Info } from "lucide-react";

type ContainerwithamountofCoursesProps = {
  courses: number;
  maxCourses: number;
};

export const CourseCounter = ({
    maxCourses,
    courses,
}: ContainerwithamountofCoursesProps) => {
const isRoleAdmins = useIsAdmin();
const canAccess = isRoleAdmins;
const maxCourseDisplay = maxCourses > 50 ? <><Infinity className="h-4 w-4 ml-1 inline" /></> : maxCourses;

return (
    canAccess && (
        <div className="border rounded-full text-center p-4 text-sm flex items-center w-full bg-slate-400 text-primary dark:text-[#000000]">
            <Info className="h-5 w-5 mr-2" />
            <span>Current existing courses: {courses} / </span>{maxCourseDisplay}
        </div>
    )
);
};
