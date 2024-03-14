"use client";
import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { LiveEvent } from "@prisma/client";
import Image from "next/image";
import Select from "react-select";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

// import vimeo from '../../../../../../../'
import vimeo from "@/assets/icons/Vimeo-Logo.png";
import youtube from "@/assets/icons/Youtube-Logo.png";

interface VideoFormProps {
  initialData: LiveEvent;
  liveEventId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

const options = [
  {
    value: "Vimeo",
    label: (
      <div className="flex items-center">
        <Image className="mr-2 w-[50px]" alt="vimeo" src={vimeo} />
        <p className="m-0">vimeo</p>
      </div>
    ),
  },
  {
    value: "Youtube",
    label: (
      <div className="flex items-center">
        <Image className="mr-2 w-[50px]" alt="youtube" src={youtube} />
        <p className="m-0">youtube</p>
      </div>
    ),
  },
];

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    background: `url(${state.data.image}) no-repeat center left`,
    backgroundSize: "contain",
    paddingLeft: "30px", // Adjust as needed
  }),
};

export const VideoForm = ({ initialData, liveEventId }: VideoFormProps) => {
  const [isEditing, setIsEditing] = useState(true);
  const [vimeoUrl, setVimeoUrl] = useState<string | null>(
    initialData.videoUrl || null
  );
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
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
          }}
          allow="autoplay; fullscreen"
        ></iframe>
      </div>
    );
  }

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/liveEvent/${liveEventId}`, values);
      toast.success("Event updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 rounded-md border bg-slate-200 p-4 dark:bg-slate-700">
      <div className="flex items-center justify-between font-medium">
        Live Event
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : initialData.videoUrl ? (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit video
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add a video
            </>
          )}
        </Button>
      </div>

      {!isEditing &&
        (vimeoUrl ? (
          <VimeoPreview videoId={extractVimeoId(vimeoUrl)!} />
        ) : (
          <div className="flex h-60 items-center justify-center rounded-md bg-slate-200">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ))}

      {isEditing && (
        <div style={{ border: "2px solid coral" }}>
          <Select options={options} onChange={(e) => console.log(e)} />
          <input
            style={{ border: "2px solid green" }}
            className="mb-2 flex w-full items-center rounded-md p-1"
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
        <div className="mt-2 text-xs text-muted-foreground">
          Refresh the page if video does not appear.
        </div>
      )}
    </div>
  );
};
