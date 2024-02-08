import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import {  Image, LayoutGridIcon } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";


import { Actions } from "./_components/actions";
import { TitleForm } from "./_components/title-form";
import { MailForm } from "./_components/link-form";
import { RoleForm } from "./_components/role-form";

const UserIdPage = async ({
  params
}: {
  params: { profileId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const profile = await db.profile.findUnique({
    where: {
      id: params.profileId,
    }
  });

  if (!profile) {
    return redirect("/");
  }

  if (profile) {
    console.log(profile);
  }

  const requiredFields = [
    profile.name,
    profile.email,
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
              User setup
            </h1>
            <span className="text-sm text-slate-700 dark:text-[#ffffff]">
              Complete all required fields {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            profileId={params.profileId}
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutGridIcon} />
              <h2 className="text-xl">
                Customize the User
              </h2>
              <span className="pl-1 text-xs text-rose-600">*required</span>
            </div>
            <TitleForm
              initialData={profile}
              profileId={profile.id}
            />
            <MailForm
                initialData={{ email: profile.email || "" }}
                profileId={profile.id}
            />
            <RoleForm
              initialData={profile}
              profileId={profile.id}
              />
          </div>
        </div>
      </div>
    </>
   );
}
 
export default UserIdPage;