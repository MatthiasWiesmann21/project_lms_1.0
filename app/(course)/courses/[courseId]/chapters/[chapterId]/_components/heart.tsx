"use client";

import { Heart } from "lucide-react";
import { useState } from "react";

const Love = ({}: any) => {
  const [isClicked, setClicked] = useState(false);
  return (
    <div className="flex">
      <div
        onClick={() => setClicked(!isClicked)}
        style={{
          background: "rgba(0, 0, 0, 0.3)",
        }}
        className="my-2 mt-3 flex cursor-pointer items-center justify-around rounded-[10px] border border-[#fff] p-[1%] px-[3%] hover:shadow-sm dark:border-[#1e172a]"
      >
        <Heart fill={!!isClicked ? "blue" : "#ffffff00"} className="m-2" />
      </div>
    </div>
  );
};

export default Love;
