import { LucideIcon } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { languageServer } from "@/lib/check-language-server";

interface InfoCardProps {
  numberOfItems: number;
  variant?: "default" | "success";
  label: string;
  icon: LucideIcon;
}

export const InfoCard = async ({
  variant,
  icon: Icon,
  numberOfItems,
  label,
}: InfoCardProps) => {
  const currentLanguage = await languageServer();

  return (
    <div className="flex items-center gap-x-2 rounded-md border p-3 dark:border-[#ffffff] ">
      <IconBadge variant={variant} icon={Icon} />
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-gray-500">
          {numberOfItems}{" "}
          {numberOfItems === 1
            ? `${currentLanguage?.infocard_course}`
            : `${currentLanguage?.infocard_courses}`}
        </p>
      </div>
    </div>
  );
};
