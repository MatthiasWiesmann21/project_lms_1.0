import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CircleDollarSign, File, Image, LayoutDashboard, LayoutGridIcon, ListChecks } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";


import { ImageForm } from "./_components/image-form";
import { LinkForm } from "./_components/link-form";
import { ColorForm } from "./_components/color-form";
import { isAdmin, isOperator } from "@/lib/roleCheckServer";
import { isOwner } from "@/lib/owner";

const CustomizeSettingsPage = async () => {
  const { userId } = auth();

  const isRoleAdmins = await isAdmin();
  const isRoleOperator = await isOperator();
  const canAccess = isRoleAdmins || isRoleOperator || isOwner(userId);

  if (!userId || !canAccess) {
   return redirect("/search");
  }

  const container = await db.container.findUnique({
    where: {
      id: process.env.CONTAINER_ID,
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
              Customize Container
            </h1>
            <span className="text-sm text-slate-700 dark:text-[#ffffff]">
              Complete all required fields {completionText}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutGridIcon} />
              <h2 className="text-xl">
                Customize your Container
              </h2>
              <span className="pl-1 text-xs text-rose-600">*required</span>
            </div>
            <LinkForm
                initialData={{ link: container.link || "" }}
                containerId={container.id}
            />
            <ColorForm
                initialData={{ primaryColor: container.primaryColor || "#0369a0" }}
                containerId={container.id} 
            />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Image} />
              <h2 className="text-xl">
                Add an Image as an Logo
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
 
export default CustomizeSettingsPage;