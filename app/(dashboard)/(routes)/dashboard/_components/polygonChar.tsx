"use client";
import React, { useEffect, useState } from "react";
// @ts-ignore
import CanvasJSReact from "@canvasjs/react-charts";
import Image from "next/image";
import { Container } from "@prisma/client";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const PolygonChart = ({
  color,
  courses,
}: {
  color: Container | null;
  courses: any;
}) => {
  const [coursesProgress, setCoursesProgress] = useState([]);

  const fetchCoursesProgress = async () => {
    try {
      const response = await fetch("/api/userhascourse");
      const data = await response.json();
      setCoursesProgress(data);
    } catch (error) {
      console.error("Error fetching course progress:", error);
    }
  };

  useEffect(() => {
    fetchCoursesProgress();
  }, []);

  console.log("courses", courses);

  const progressArray = courses?.map(
    (each: any) =>
      each?.chapters?.reduce(
        (acc: any, val: any) => acc + (val?.userProgress[0]?.progress || 0),
        0
      ) / each?.chapters?.length
  );
  // console.log("totalProgress", progressArray);
  const inProgress =
    (progressArray.filter((val: number) => val > 0 && val < 100)?.length /
      progressArray?.length) *
    100;
  const notStarted =
    (progressArray.filter((val: number) => val === 0)?.length /
      progressArray?.length) *
    100;
  const completed =
    (progressArray.filter((val: number) => val === 100)?.length /
      progressArray?.length) *
    100;
  // console.log("inProgress", inProgress);
  // console.log("notStarted", notStarted);
  // console.log("completed", completed);
  const getCourseStatusPercentage = (status: string) => {
    const filteredCourses = coursesProgress.filter(
      (course: { status: string }) => course.status === status
    );
    return (filteredCourses.length / coursesProgress.length) * 100 || 0;
  };

  const polygonOptions = {
    animationEnabled: true,
    exportEnabled: true,
    backgroundColor: "transparent",
    theme: "dark1",
    axisY: {
      suffix: "h",
    },
    axisX: {
      interval: 1,
    },
    data: [
      {
        type: "line",
        lineColor: color?.PrimaryButtonColor,
        dataPoints: weekdays.map((day, index) => ({
          x: index + 1,
          y: 60 + Math.floor(Math.random() * 5), // Example data
          color,
          label: day,
        })),
      },
    ],
  };

  const doughnutOptions = {
    animationEnabled: true,
    backgroundColor: "transparent",
    subtitles: [
      {
        text: `${coursesProgress.length} Total Courses`,
        verticalAlign: "center",
        fontSize: 24,
        dockInsidePlotArea: true,
        fontColor: "white",
      },
    ],
    data: [
      {
        type: "doughnut",
        innerRadius: "90%",
        dataPoints: [
          {
            name: "Complete",
            // y: getCourseStatusPercentage("completed"),
            y: completed,
            color: "#12b76a",
          },
          {
            name: "Inprogress",
            // y: getCourseStatusPercentage("inProgress"),
            y: inProgress,
            color: "#f79009",
          },
          {
            name: "Not Started",
            // y: getCourseStatusPercentage("notStarted"),
            y: notStarted,
            color: "#84caff",
          },
        ],
      },
    ],
  };

  const maxCourses = 5;

  const sortedCourses = courses.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const sortedChapters = courses.flatMap((course) =>
    course.chapters
      .map((chapter) => ({
        ...course,
        ...chapter,
        courseName: course?.title,
        totalCount:
          (chapter.likes.length || 0) + (chapter.comments.length || 0),
      }))
      .sort((a, b) => (b.totalCount || 0) - (a.totalCount || 0))
  );

  return (
    <div className="flex justify-between">
      <div className="w-[69%] rounded border dark:border-[#221b2e] dark:bg-[#0D071A]">
        <div className="flex items-center justify-between p-2 text-lg">
          <div>Most popular chapters</div>
        </div>
        <div className="flex items-center justify-between bg-slate-100 p-2 dark:bg-[#150D22]">
          <p className="w-[39%] text-sm">Chapter Name</p>
          <p className="w-[15%] text-sm">Course Name</p>
          <p className="w-[15%] text-sm">Likes</p>
          <p className="w-[15%] text-sm">Comments</p>
          <p className="w-[10%] text-sm">Action</p>
        </div>
        {/* {sortedCourses?.slice(0, maxCourses).map((each: any) => { */}
        {sortedChapters.map((each: any) => (
          <div
            key={each?.id}
            className="my-1 flex items-center justify-between p-2"
          >
            <div className="items-cetner flex w-[40%] items-center">
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
            <div className="w-[15%]">
              <p>{each?.courseName}</p>
            </div>
            <div className="w-[15%]">
              <p>{each?.likes?.length}</p>
            </div>
            <div className="w-[15%]">
              <p>{each?.comments?.length}</p>
            </div>
            <div className="flex w-[10%]">
              <span
                className="border-1 rounded-full border px-2 py-2 text-xs transition duration-300 ease-in-out"
                style={{
                  borderColor: color?.PrimaryButtonColor || undefined,
                }}
              >
                VIEW
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="w-[30%] rounded border px-4 dark:border-[#221b2e] dark:bg-[#0D071A]">
        <p className="mt-3 text-[18px]">Course Statistics</p>
        <CanvasJSChart options={doughnutOptions} />
        <div className="flex justify-between">
          {[
            {
              label: "Complete",
              color: "#12b76a",
              value: completed,
            },
            {
              label: "Inprogress",
              color: "#f79009",
              value: inProgress,
            },
            {
              label: "Not Started",
              color: "#84caff",
              value: notStarted,
            },
          ].map(({ label, color, value }) => (
            <div key={label} className="flex items-start">
              <div
                className="mr-1 mt-1 rounded-full border border-[7px]"
                style={{ borderColor: color }}
              />
              <div>
                <p className="m-0 text-[14px] text-gray-500">{label}</p>
                <p className="m-0 text-[18px] font-[900]">
                  {/* {getCourseStatusPercentage(status)}% */}
                  {value}%
                </p>
              </div>
              <div className="border-1 mx-2 my-[2%] border-r border-gray-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PolygonChart;
