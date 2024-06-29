"use client";

import axios from "axios";
import { Heart } from "lucide-react";

const Love = ({ liveEvent, getLiveEvent }: any) => (
  <div className="flex">
    <div
      onClick={async () => {
        const response = await axios?.post(`/api/like/create`, {
          liveEventId: liveEvent?.id,
        });
        if (response?.status === 200) getLiveEvent();
      }}
      className="my-2 mt-3 flex cursor-pointer items-center justify-around rounded-[10px] border border-[#fff] bg-slate-100/60 p-1 px-2 hover:shadow-sm dark:border-[#1e172a] dark:bg-[#0c0319]"
    >
      {liveEvent?.likes?.length}
      <Heart
        size={24}
        fill={!!liveEvent?.currentLike ? "#f43f5e" : "#ffffff00"}
        className="ml-2 transition duration-200 ease-in-out hover:scale-110"
        style={!!liveEvent?.currentLike ? { color: "#f43f5e" } : {}}
      />
    </div>
  </div>
);

export default Love;
