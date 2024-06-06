"use client";
import { Line } from "rc-progress";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/check-language";

const CourseTable = ({ courses }: { courses: any[] }) => {
  const currentLanguage = useLanguage();
  const maxCourses = 5;

  return (
  <div className="rounded-md border dark:border-[#221b2e] dark:bg-[#0D071A]">
    <div className="flex items-center justify-between p-2 text-lg">
      <div>{currentLanguage.dashboard_courseTable_CourseStatus_Title}</div>
      <Link href={`/dashboard/course-list`} className="flex items-center justify-center rounded-full border px-4 py-2 text-sm hover:bg-[#EA2088] dark:hover:bg-[#EA2088] hover:text-white transition duration-500 ease-in-out">
        {currentLanguage.dashboard_courseTable_viewAllCourses_button_text}
      </Link>
    </div>
    <div className="flex items-center justify-between p-2 bg-slate-100 dark:bg-[#150D22]">
      <p className="w-[45%]">{currentLanguage.dashboard_courseTable_courseName}</p>
      <p className="w-[10%]">{currentLanguage.dashboard_courseTable_paid}</p>
      <p className="w-[15%]">{currentLanguage.dashboard_courseTable_progress}</p>
      <p className="w-[10%]">{currentLanguage.dashboard_courseTable_chapter}</p>
      <p className="w-[15%]">{currentLanguage.dashboard_courseTable_action}</p>
    </div>
    {courses?.slice(0, maxCourses).map((each: any, index: number) => {
      return (
        <div
          key={each?.id}
          className="my-1 flex items-center justify-between p-2"
        >
          <div className="items-cetner flex w-[45%] items-center">
            <Image
              alt="img"
              src={each?.imageUrl}
              objectFit="contain"
              width={60}
              height={60}
              className="rounded-sm"
            />
            <div className="ml-2">
              <p className="m-0 text-sm">{each?.title}</p>
              <p className="m-0 text-xs text-gray-500">
                {each?.category?.name}
              </p>
            </div>
          </div>
          <div className="w-[10%]">
            <p>${each?.price}</p>
          </div>
          <div className="w-[15%] pr-5">
            <Line
              percent={(index + 1) * 20}
              strokeWidth={5}
              strokeColor="#EA2088"
            />
          </div>
          <div className="w-[10%]">
            <p>{each?.chapters?.length}</p>
          </div>
          <Link className="w-[15%]" href={`/courses/${each.id}`}>
            <span className="border-1 rounded-full border px-4 py-1 border-[#EA2088] hover:bg-[#EA2088] dark:hover:bg-[#EA2088] hover:text-white transition duration-500 ease-in-out">
              {currentLanguage.dashboard_courseTable_viewCourse_button_text}
            </span>
          </Link>
        </div>
      );
    })}
  </div>
);
}

export default CourseTable;
