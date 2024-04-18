"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Container } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { useLanguage } from "@/lib/check-language";

interface ImageFormIconProps {
  initialData: Container
  containerId: string;
};

const formSchema = z.object({
  icon: z.string().min(1, {
    message: "Image is required",
  }),
});

export const ImageFormIcon = ({
  initialData,
  containerId
}: ImageFormIconProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const currentLanguage = useLanguage();
  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/containers/${containerId}`, values);
      toast.success("Container updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="mt-6 border bg-slate-200 dark:bg-slate-700 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        {currentLanguage.settings_Container_IconForm_title}
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>{currentLanguage.customize_ImageForm_cancel}</>
          )}
          {!isEditing && !initialData.icon && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              {currentLanguage.customize_ImageForm_addImage}
            </>
          )}
          {!isEditing && initialData.icon && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              {currentLanguage.customize_ImageForm_edit}
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.icon ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 dark:bg-slate-700 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.icon}
            />
          </div>
        )
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="ContainerIcon"
            onChange={(url) => {
              if (url) {
                onSubmit({ icon: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            {currentLanguage.customize_ImageForm_imageHint}
          </div>
        </div>
      )}
    </div>
  )
}