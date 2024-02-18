"use client";

import { useState } from "react";

interface VideoPlayerProps {
  playbackId?: string;
  title: string;
  videoUrl: string;
};

export const VideoPlayer = ({
  title,
  videoUrl,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false); // TODO: Implement function which set this to true when event started at giving datetime.

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
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <p>Youre current Event hasnt started yet please wait until the countdown gets to zero.</p>
        </div>
      )}
      {isReady && (
        <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
          <iframe 
            src={`https://player.vimeo.com/video/${extractVimeoId(videoUrl)!}`} 
            style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }} 
            allow="autoplay; fullscreen" 
            onLoad={() => setIsReady(true)}
            title={title}
          ></iframe>
        </div>
      )}
    </div>
  )
}
