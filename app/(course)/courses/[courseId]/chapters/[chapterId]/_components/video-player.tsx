"use client";
import { Lock } from "lucide-react";
import UniversalPlayer from "@/pages/components/universalPlayer";
import { useEffect, useState } from "react";

interface VideoPlayerProps {
  playbackId?: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string | undefined;
  videoUrl: string;
  params: {
    courseId: string;
    chapterId: string;
  };
}

export const VideoPlayer = ({
  isLocked,
  videoUrl,
  params,
}: VideoPlayerProps) => {
  if (!videoUrl) {
    console.error("Vimeo URL is not provided!");
    return null;
  }

  const [chapterProgress, setChapterProgress] = useState(null);

  const getChapterProgress = async () => {
    const response = await fetch(
      `/api/progress/${params.courseId}/${params.chapterId}`
    );
    const data = await response?.json();
    // console.log("data", data);
    // {
    //   "id": "1",
    //   "userId": "user_2cPlDKbzzpYor9eUrapztp45Yfz",
    //   "chapterId": "e07ee97e-b78b-4a51-b5d0-973d82d07386",
    //   "isCompleted": false,
    //   "progress": 0,
    //   "createdAt": "2024-07-05T13:04:00.147Z",
    //   "updatedAt": "2024-07-05T13:04:00.147Z"
    // }
    setChapterProgress(data);
  };

  useEffect(() => {
    getChapterProgress();
  }, []);

  return (
    <div className="relative aspect-video">
      {isLocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-2 bg-slate-800 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <UniversalPlayer
          url={videoUrl}
          onProgress={async (state: any) => {
            const played = state.played;
            const playedPercent = played * 100;
            if (
              playedPercent?.toString()?.split(".")[0] >
              (chapterProgress?.progress?.toString()?.split(".")[0] || 0)
            ) {
              try {
                const response = await fetch(
                  `/api/progress/${params.courseId}/${params.chapterId}`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      isCompleted: false,
                      progress: playedPercent,
                    }),
                  }
                );
                if (!response.ok) {
                  throw new Error("Failed to update progress");
                }
                const data = await response.json();
                setChapterProgress(data); // Update local state if necessary
              } catch (error) {
                console.error("Error updating progress:", error);
              }
            }
          }}
        />
      )}
    </div>
  );
};
