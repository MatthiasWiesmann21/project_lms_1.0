"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface VideoPlayerProps {
  playbackId?: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
  vimeoUrl: string;
  videoUrl: string;
};

export const VideoPlayer = ({
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
  videoUrl,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();

  if (!videoUrl) {
    console.error("Vimeo URL is not provided!");
    return null;
  }
  const vimeoId = extractVimeoId(videoUrl);
  

  function extractVimeoId(url: string): string | null {
    const match = url.match(/https:\/\/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
  }

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
          isCompleted: true,
        });

        if (!nextChapterId) {
          confetti.onOpen();
        }

        toast.success("Progress updated");
        router.refresh();

        if (nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
        }
      }
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">
            This chapter is locked
          </p>
        </div>
      )}
      {!isLocked && (
        <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
          <iframe 
            src={`https://player.vimeo.com/video/${extractVimeoId(videoUrl)!}`} 
            style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }} 
            frameborder="0" 
            allow="autoplay; fullscreen" 
            allowfullscreen
            onLoad={() => setIsReady(true)}
            onEnded={onEnd}
            title={title}
          ></iframe>
        </div>
      )}
    </div>
  )
}
