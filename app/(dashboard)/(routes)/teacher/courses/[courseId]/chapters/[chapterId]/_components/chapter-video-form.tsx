"use client";
import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

interface ChapterVideoFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
};

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [vimeoUrl, setVimeoUrl] = useState<string | null>(initialData.videoUrl || null);
  const router = useRouter();

  function extractVimeoId(url: string): string | null {
    const match = url.match(/https:\/\/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
  }

  function VimeoPreview({ videoId }: { videoId: string }) {
    return (
      <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
        <iframe 
          src={`https://player.vimeo.com/video/${videoId}`} 
          style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }} 
          allow="autoplay; fullscreen" 
          >
        </iframe>
      </div>
    );
  }

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toast.success("Chapter updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="mt-6 border bg-slate-200 dark:bg-slate-700 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter video
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? <>Cancel</> : initialData.videoUrl ? (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a video
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        vimeoUrl ? (
          <VimeoPreview videoId={extractVimeoId(vimeoUrl)!} />
        ) : (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        )
      )}

      {isEditing && (
        <div>
          <input
            className="mb-2 flex items-center rounded-md p-1 w-full"
            type="text"
            placeholder="Vimeo Share Link"
            onChange={(e) => {
              const videoId = extractVimeoId(e.target.value);
              if (videoId) {
                setVimeoUrl(e.target.value);
                onSubmit({ videoUrl: e.target.value });
              }
            }}
          />
          {vimeoUrl && <VimeoPreview videoId={extractVimeoId(vimeoUrl)!} />}
        </div>
      )}

      {vimeoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Refresh the page if video does not appear.
        </div>
      )}
    </div>
  )
}
