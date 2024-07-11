"use client";
import React, { useEffect, useState } from "react";
// @ts-ignore
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const PolygonChart = ({ color }: { color: string | null | undefined }) => {
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
        lineColor: color,
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
            y: getCourseStatusPercentage("completed"),
            color: "#12b76a",
          },
          {
            name: "Inprogress",
            y: getCourseStatusPercentage("inProgress"),
            color: "#f79009",
          },
          {
            name: "Not Started",
            y: getCourseStatusPercentage("notStarted"),
            color: "#84caff",
          },
        ],
      },
    ],
  };

  return (
    <div className="flex justify-between">
      <div className="w-[65%] rounded border px-4 dark:border-[#221b2e] dark:bg-[#0D071A]">
        <div className="my-3 flex">
          <p className="text-[18px]">
            Time Spending
            <span className="ml-5 mr-2 text-[32px] font-[600]">18h</span>
            <span className="text-[14px]">20m</span>
          </p>
        </div>
        <CanvasJSChart options={polygonOptions} />
      </div>
      <div className="w-[30%] rounded border px-4 dark:border-[#221b2e] dark:bg-[#0D071A]">
        <p className="mt-3 text-[18px]">Course Statistics</p>
        <CanvasJSChart options={doughnutOptions} />
        <div className="flex justify-between">
          {[
            { label: "Complete", color: "#12b76a", status: "completed" },
            { label: "Inprogress", color: "#f79009", status: "inProgress" },
            { label: "Not Started", color: "#84caff", status: "notStarted" },
          ].map(({ label, color, status }) => (
            <div key={label} className="flex items-start">
              <div
                className="mr-1 mt-1 rounded-full border border-[7px]"
                style={{ borderColor: color }}
              />
              <div>
                <p className="m-0 text-[14px] text-gray-500">{label}</p>
                <p className="m-0 text-[18px] font-[900]">
                  {getCourseStatusPercentage(status)}%
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
