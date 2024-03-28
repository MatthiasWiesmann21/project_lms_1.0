import { LucideIcon } from "lucide-react";

import { IconBadge } from "@/components/icon-badge"
import { languageServer } from "@/lib/check-language-server";

interface InfoCardProps {
  numberOfItems: number;
  variant?: "default" | "success";
  label: string;
  icon: LucideIcon;
}

export const InfoCard = ({
  variant,
  icon: Icon,
  numberOfItems,
  label,
}: InfoCardProps) => {
  const currentLanguage = languageServer();
  return (
    <div className="border dark:border-[#ffffff] rounded-md flex items-center gap-x-2 p-3 ">
      <IconBadge
        variant={variant}
        icon={Icon}
      />
      <div>
        <p className="font-medium">
          {label}
        </p>
        <p className="text-gray-500 text-sm">
          {numberOfItems} {numberOfItems === 1 ? `${currentLanguage?.infocard_course}` : `${currentLanguage?.infocard_courses}` }
        </p>
      </div>
    </div>
  )
}