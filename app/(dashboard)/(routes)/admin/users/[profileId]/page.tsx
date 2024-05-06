import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Image, LayoutGridIcon } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";

import { Actions } from "./_components/actions";
import { ShowUserName } from "./_components/title-form";
import { ShowUserMail } from "./_components/showUserMail";
import { RoleForm } from "./_components/role-form";
import { isBannedForm } from "./_components/isBanned-form";
import { languageServer } from "@/lib/check-language-server";

const UserIdPage = async ({ params }: { params: { profileId: string } }) => {
  const { userId } = auth();
  const currentLanguage = await languageServer();
  if (!userId) {
    return redirect("/");
  }

  const profile = await db.profile.findUnique({
    where: {
      id: params.profileId,
    },
  });

  if (!profile) {
    return redirect("/");
  }

  const requiredFields = [profile.name, profile.email];

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
              {currentLanguage.user_setup_title}
            </h1>
            <span className="text-sm text-slate-700 dark:text-[#ffffff]">
              {currentLanguage.user_setup_undertitle} {completionText}
            </span>
          </div>
          <Actions disabled={!isComplete} profileId={params.profileId} />
        </div>
        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutGridIcon} />
              <h2 className="text-xl">
                {currentLanguage.user_setup_customize_title}
              </h2>
              <span className="pl-1 text-xs text-rose-600">
                {currentLanguage.requiredFields}
              </span>
            </div>
            <ShowUserName initialData={profile} profileId={profile.id} />
            <ShowUserMail initialData={profile} profileId={profile.id} />
            <RoleForm
              initialData={profile}
              profileId={profile.id}
              options={[
                { label: "ADMIN", value: "ADMIN" },
                { label: "OPERATOR", value: "OPERATOR" },
                { label: "MODERATOR", value: "MODERATOR" },
                { label: "USER", value: "USER" },
              ]}
            />
          </div>
          <div>
            <isBannedForm
              initialData={profile}
              profileId={profile.id}
              options={[
                { label: "BANNED", value: "true" },
                { label: "NOT BANNED", value: "false" },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserIdPage;
