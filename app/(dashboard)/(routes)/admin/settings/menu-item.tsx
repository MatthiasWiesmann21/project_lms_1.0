"use client";

import { AlertTriangle, LucideIcon, Palette } from "lucide-react";
import { useRouter } from "next/navigation";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isNew?: boolean;
  somethingImportant?: boolean;
};

export const MenuItem = ({
  icon: Icon,
  label,
  href,
  isNew,
  somethingImportant,
}: SidebarItemProps) => {
    const router = useRouter();

const onClick = () => {
    router.push(href);
}

  return (
    <button onClick={onClick} className="group">
      <div className="hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full dark:border-[#ffffff] bg-[#e7e7e9] dark:bg-transparent">
        <div className="relative w-full rounded-md overflow-hidden">
        <div className="flex items-center justify-center py-6">
          <Icon size={64} />
        </div>
        <div className="py-1 flex ">
            <h2 className="text-lg font-medium group-hover:text-sky-500">{label}</h2>
        </div>
        </div>
        <div className="flex justify-start">
        {isNew && (
          <div className="inline-flex items-center rounded-md border px-2 py-2 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-500/20 text-green-500 mr-2">
          New
        </div>
        )}
        {somethingImportant && (
        <div className="justify-start">
          <div className="inline-flex items-center rounded-md border px-2 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-orange-400/10 text-yellow-500">
            <AlertTriangle size={16} />
            </div>
        </div>
        )}
        </div>
      </div>
    </button>
    
  )
}