"use client";

import axios from "axios";
import { ThumbsUp } from "lucide-react";

const Like = ({ liveEvent, getLiveEvent }: any) => (
  <div className="flex">
    <div
      onClick={async () => {
        const response = await axios?.post(`/api/like/create`, {
          liveEventId: liveEvent?.id,
        });
        if (response?.status === 200) getLiveEvent();
      }}
      className="my-2 mt-3 flex cursor-pointer items-center justify-around rounded-[20px] border border-[#fff] p-[1%] px-[3%]"
    >
      <ThumbsUp
        fill={!!liveEvent?.currentLike ? "blue" : "#ffffff00"}
        className="mr-2"
      />
      {liveEvent?.likes?.length}
    </div>
  </div>
);

export default Like;
