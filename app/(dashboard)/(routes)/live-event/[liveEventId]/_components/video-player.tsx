"use client";

import UniversalPlayer from "@/pages/components/universalPlayer";
import { useState } from "react";

interface VideoPlayerProps {
  playbackId?: string;
  title: string;
  videoUrl: string;
}

export const VideoPlayer = ({ title, videoUrl }: VideoPlayerProps) => {
  if (!videoUrl) {
    console.error("Vimeo URL is not provided!");
    return null;
  }

  function extractVimeoId(url: string): string | null {
    const match = url.match(/https:\/\/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
  }

  return (
    <div className="relative aspect-video">
      {/* <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
        <p>
          Youre current Event hasnt started yet please wait until the countdown
          gets to zero.
        </p>
      </div> */}

      {/* <div style={{ padding: "56.25% 0 0 0", position: "relative" }}> */}
      <UniversalPlayer
        // url={`https://player.vimeo.com/video/${extractVimeoId(videoUrl)!}`}
        // url={`https://vimeo.com/881023708?share=copy`}
        url={`https://www.youtube.com/watch?v=umepbfKp5rI`}
      />
      {/* <iframe
          src={`https://player.vimeo.com/video/${extractVimeoId(videoUrl)!}`}
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
          }}
          allow="autoplay; fullscreen"
          title={title}
        ></iframe> */}
      {/* </div> */}
    </div>
  );
};
