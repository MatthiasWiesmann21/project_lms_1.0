"use client";
import { Line } from "rc-progress";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/check-language";
import { BookX } from "lucide-react";

const CourseTable = ({ courses }: { courses: any[] }) => {
  const currentLanguage = useLanguage();
  const maxCourses = 5;

  const sortedCourses = courses.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="rounded-md border dark:border-[#221b2e] dark:bg-[#0D071A]">
      <div className="flex items-center justify-between p-2 text-lg">
        <div>{currentLanguage.dashboard_courseTable_CourseStatus_Title}</div>
        <Link
          href={`/dashboard/course-list`}
          className="flex items-center justify-center rounded-full border px-4 py-2 text-sm transition duration-500 ease-in-out hover:bg-[#EA2088] hover:text-white dark:hover:bg-[#EA2088]"
        >
          {currentLanguage.dashboard_courseTable_viewAllCourses_button_text}
        </Link>
      </div>
      <div className="flex items-center justify-between bg-slate-100 p-2 dark:bg-[#150D22]">
        <p className="w-[45%] text-sm">
          {currentLanguage.dashboard_courseTable_courseName}
        </p>
        <p className="w-[10%] text-sm">
          {currentLanguage.dashboard_courseTable_paid}
        </p>
        <p className="w-[15%] text-sm">
          {currentLanguage.dashboard_courseTable_progress}
        </p>
        <p className="w-[10%] text-sm">
          {currentLanguage.dashboard_courseTable_chapter}
        </p>
        <div className="w-[15%]"></div>
      </div>
      {sortedCourses?.slice(0, maxCourses).map((each: any) => {
        const totalProgress =
          each?.chapters?.reduce(
            (acc: any, val: any) => acc + (val?.userProgress[0]?.progress || 0),
            0
          ) / each?.chapters?.length;
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
                width={65}
                height={65}
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
                // percent={each?.progress || 0}
                percent={totalProgress}
                strokeWidth={3}
                strokeColor="#EA2088"
              />
            </div>
            <div className="w-[5%]">
              <p>{each?.chapters?.length}</p>
            </div>
            <div className="flex w-[20%] justify-end px-2">
              <Link href={`/courses/${each.id}`}>
                <span className="border-1 rounded-full border border-[#EA2088] px-2 py-2 text-xs transition duration-500 ease-in-out hover:bg-[#EA2088] hover:text-white dark:hover:bg-[#EA2088]">
                  {currentLanguage.dashboard_courseTable_viewCourse_button_text}
                </span>
              </Link>
            </div>
          </div>
        );
      })}
      {sortedCourses?.length === 0 && (
        <div className="flex h-16 items-center justify-center text-sm text-muted-foreground">
          <BookX className="m-1" size={24} />
          <span>{currentLanguage?.no_courses}</span>
        </div>
      )}
    </div>
  );
};

export default CourseTable;
