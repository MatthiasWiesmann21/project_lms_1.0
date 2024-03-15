"use client";

import UniversalPlayer from "@/pages/components/universalPlayer";

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

  return (
    <div className="relative aspect-video">
      {/* <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
        <p>
          Youre current Event hasnt started yet please wait until the countdown
          gets to zero.
        </p>
      </div> */}
      <UniversalPlayer url={videoUrl} />
    </div>
  );
};
