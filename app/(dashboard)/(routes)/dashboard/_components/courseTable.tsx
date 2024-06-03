"use client";
import { Line } from "rc-progress";
import Image from "next/image";
import React from "react";

const CourseTable = ({ courses }: { courses: any[] }) => (
  <div className="rounded-md border dark:border-[#221b2e] dark:bg-[#0D071A]">
    <div className="flex items-center justify-between p-2 text-[18px]">
      <div>Course Status</div>
      <div className="flex items-center justify-center rounded-full border px-[12px] py-[8px] text-[10px] dark:border-[#221b2e]">
        View All
      </div>
    </div>
    <div className="flex items-center justify-between p-2 dark:bg-[#150D22]">
      <div className="w-[45%]">Course Name</div>
      <div className="w-[10%]">Paid</div>
      <div className="w-[15%]">Progress</div>
      <div className="w-[10%]">Chapter</div>
      <div className="w-[15%]">Action</div>
    </div>
    {courses?.map((each: any, index: number) => {
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
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="ml-2">
              <p className="m-0 text-[14px]">{each?.title}</p>
              <p className="m-0 text-[12px] text-gray-500">
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
              strokeWidth={4}
              strokeColor="#EA2088"
            />
          </div>
          <div className="w-[10%]">
            <p>{each?.chapters?.length}</p>
          </div>
          <div className="w-[15%]">
            <span className="border-1 rounded-full border border-[#EA2088] px-4 py-1">
              PLAY
            </span>
          </div>
        </div>
      );
    })}
  </div>
);

export default CourseTable;
