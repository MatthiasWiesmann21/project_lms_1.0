import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ArrowLeft, PaletteIcon } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";

import { PrimaryButtonColorForm } from "./_components/primary-color-form";
import { isAdmin, isOperator } from "@/lib/roleCheckServer";
import { isOwner } from "@/lib/owner";
import { languageServer } from "@/lib/check-language-server";
import { DarkPrimaryButtonColorForm } from "./_components/darkPrimary-color-form";
import Link from "next/link";

const DesignSettingsPage = async () => {
  const { userId } = auth();
  const currentLanguage = await languageServer();
  const isRoleAdmins = await isAdmin();
  const isRoleOperator = await isOperator();
  const canAccess = isRoleAdmins || isRoleOperator || isOwner(userId);

  if (!userId || !canAccess) {
    return redirect("/search");
  }

  const container: any = await db.container.findUnique({
    where: {
      id: process.env.CONTAINER_ID,
    },
  });

  console.log("123456789", container);

  if (!container) {
    return redirect("/");
  }

  return (
    <>
      <div className="p-6">
        <Link
          href={"/admin/settings"}
          className="mb-6 flex items-center text-sm transition hover:opacity-75"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {currentLanguage.settings_backToAdminSettings_button_text}
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">
              {currentLanguage?.customize_customizeContainer_title}
            </h1>
          </div>
        </div>
        <div className="mt-12">
          <div className="flex items-center gap-x-2">
            <IconBadge icon={PaletteIcon} />
            <h2 className="text-xl">
              {currentLanguage.customize_PrimaryButtonColors_title}
            </h2>
            <span className="pl-1 text-xs text-rose-600">
              {currentLanguage.requiredFields}
            </span>
          </div>
          <PrimaryButtonColorForm
            initialData={{
              PrimaryButtonColor: container?.PrimaryButtonColor || "#0369a0",
            }}
            containerId={container.id}
          />
          <div className="flex items-center gap-x-2 pt-6">
            <IconBadge icon={PaletteIcon} />
            <h2 className="text-xl">
              {currentLanguage.customize_PrimaryButtonColorsDark_title}
            </h2>
            <span className="pl-1 text-xs text-rose-600">
              {currentLanguage.requiredFields}
            </span>
          </div>
          <DarkPrimaryButtonColorForm
            initialData={{
              DarkPrimaryButtonColor:
                container.DarkPrimaryButtonColor || "#0369a0",
            }}
            containerId={container.id}
          />
        </div>
      </div>
    </>
  );
};

export default DesignSettingsPage;
