"use client";
import { Lock } from "lucide-react";
import UniversalPlayer from "@/pages/components/universalPlayer";

interface VideoPlayerProps {
  playbackId?: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string | undefined;
  videoUrl: string;
}

export const VideoPlayer = ({ isLocked, videoUrl }: VideoPlayerProps) => {
  if (!videoUrl) {
    console.error("Vimeo URL is not provided!");
    return null;
  }

  return (
    <div className="relative aspect-video">
      {isLocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-2 bg-slate-800 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}
      {!isLocked && <UniversalPlayer url={videoUrl} />}
    </div>
  );
};
