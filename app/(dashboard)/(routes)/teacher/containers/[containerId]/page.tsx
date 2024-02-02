import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CircleDollarSign, File, Image, LayoutDashboard, LayoutGridIcon, ListChecks } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";


import { ImageForm } from "./_components/image-form";
import { Actions } from "./_components/actions";
import { TitleForm } from "./_components/title-form";
import { LinkForm } from "./_components/link-form";

const ContainerIdPage = async ({
  params
}: {
  params: { containerId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const container = await db.container.findUnique({
    where: {
      id: params.containerId,
    }
  });

  if (!container) {
    return redirect("/");
  }

  const requiredFields = [
    container.name,
    container.imageUrl,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">
              Container setup
            </h1>
            <span className="text-sm text-slate-700 dark:text-[#ffffff]">
              Complete all required fields {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            containerId={params.containerId}
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutGridIcon} />
              <h2 className="text-xl">
                Customize your Post
              </h2>
              <span className="pl-1 text-xs text-rose-600">*required</span>
            </div>
            <TitleForm
              initialData={container}
              containerId={container.id}
            />
            <LinkForm
                initialData={{ link: container.link || "" }}
                containerId={container.id}
            />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Image} />
              <h2 className="text-xl">
                Add an Image to your Post
              </h2>
              <span className="pl-1 text-xs text-rose-600">*required</span>
            </div>
            <ImageForm
              initialData={container}
              containerId={container.id}
              />
          </div>
        </div>
      </div>
    </>
   );
}
 
export default ContainerIdPage;