"use client";
import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const doughntOptions = {
  animationEnabled: true,
  backgroundColor: "transparent",
  title: {
    // text: "Customer Satisfaction",
  },
  subtitles: [
    {
      text: `22 Total Courses`,
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
        { name: "Complete", y: 20, color: "rgba(18, 183, 106, 1)" },
        { name: "Inprogress", y: 30, color: "rgba(247, 144, 9, 1)" },
        { name: "Not Started", y: 40, color: "rgba(132, 202, 255, 1)" },
      ],
    },
  ],
};

const PolygonChar = ({ color }: { color: string | any }) => {
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
  return (
    <div className="flex items-center" style={{ border: "10px solid blue" }}>
      <div style={{ border: "10px solid green" }} className="w-[70%]">
        <CanvasJSChart
          options={polygonOptions}
          /* onRef={ref => this.chart = ref} */
        />
      </div>
      <div style={{ border: "10px solid coral" }} className="w-[30%]">
        <CanvasJSChart
          options={doughntOptions}
          /* onRef={ref => this.chart = ref} */
        />
      </div>
    </div>
  );
};

export default PolygonChar;
