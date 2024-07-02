"use client";
import React, { useEffect, useState } from "react";
// @ts-ignore
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const PolygonChar = ({ color }: { color: string | any }) => {
  const [coursesProgress, setCoursesProgress] = useState([]);
  const polygonOptions = {
    animationEnabled: true,
    exportEnabled: true,
    backgroundColor: "transparent",
    theme: "dark1", // "light1", "light2", "dark2"

    axisY: {
      //   title: "Bounce Rate",
      suffix: "h",
    },
    axisX: {
      //   title: "Week of Year",
      //   prefix: "W",
      interval: 1,
    },
    data: [
      {
        type: "line",
        // toolTipContent: "Day {x}: {y}%",
        // toolTipContent: weekdays["{x}"] + ": {y}%",
        lineColor: color,
        dataPoints: [
          { x: 1, y: 64, color, label: weekdays[0] },
          { x: 2, y: 61, color, label: weekdays[1] },
          { x: 3, y: 64, color, label: weekdays[2] },
          { x: 4, y: 62, color, label: weekdays[3] },
          { x: 5, y: 64, color, label: weekdays[4] },
          { x: 6, y: 60, color, label: weekdays[5] },
          { x: 7, y: 58, color, label: weekdays[6] },
        ],
      },
    ],
  };
  const doughntOptions = {
    animationEnabled: true,
    backgroundColor: "transparent",
    title: {
      // text: "Customer Satisfaction",
    },
    subtitles: [
      {
        text: `${coursesProgress?.length} Total Courses`,
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
        //   showInLegend: true,
        //   indexLabel: "{name}: {y}",
        //   yValueFormatString: "#,###'%'",
        dataPoints: [
          { name: "Complete", y: 20, color: "#12b76a" },
          { name: "Inprogress", y: 30, color: "#f79009" },
          { name: "Not Started", y: 40, color: "#84caff" },
        ],
      },
    ],
  };
  const getCoursesProgress = async () => {
    const response = await fetch("/api/userhascourse");
    const data = await response?.json();
    // console.log("111111111111", data);
    setCoursesProgress(data);
  };
  useEffect(() => {
    getCoursesProgress();
  }, []);
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
        <CanvasJSChart
          options={polygonOptions}
          /* onRef={ref => this.chart = ref} */
        />
      </div>
      <div className="w-[30%] rounded border px-4 dark:border-[#221b2e] dark:bg-[#0D071A]">
        <p className="mt-3 text-[18px]">Course Statistics</p>
        <CanvasJSChart
          options={doughntOptions}
          /* onRef={ref => this.chart = ref} */
        />
        <div className="flex justify-between">
          <div className="flex items-start">
            <div className="mr-1 mt-1 rounded-full border border-[7px] border-[#12b76a]" />
            <div className="">
              <p className="m-0 text-[14px] text-gray-500">Complete</p>
              <p className="m-0 text-[18px] font-[900]">
                {((coursesProgress?.filter(
                  (item) => item?.status === "completed"
                )?.length /
                  coursesProgress?.length) *
                  100) |
                  0}
                %
              </p>
            </div>
          </div>
          <div className="border-1 my-[2%] border-r border-gray-500" />
          <div className="flex items-start">
            <div className="mr-1 mt-1 rounded-full border border-[7px] border-[#f79009]" />
            <div className="">
              <p className="m-0 text-[14px] text-gray-500">Inprogress</p>
              <p className="m-0 text-[18px] font-[900]">
                {((coursesProgress?.filter(
                  (item) => item?.status === "inProgress"
                )?.length /
                  coursesProgress?.length) *
                  100) |
                  0}
                %
              </p>
            </div>
          </div>
          <div className="border-1 my-[2%] border-r border-gray-500" />
          <div className="flex items-start">
            <div className="mr-1 mt-1 rounded-full border border-[7px] border-[#84caff]" />
            <div className="">
              <p className="m-0 text-[14px] text-gray-500">Not Started</p>
              <p className="m-0 text-[18px] font-[900]">
                {((coursesProgress?.filter(
                  (item) => item?.status === "notStarted"
                )?.length /
                  coursesProgress?.length) *
                  100) |
                  0}
                %
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolygonChar;
