"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isNew?: boolean;
};

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
  isNew,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  }


  return (
     <button
        onClick={onClick}
        type="button"
        className={cn(
          "m-1 pl-2 text-sm rounded-lg flex items-center hover:bg-[#bf1e2e]/10 dark:hover:bg-[#bf1e2e]/10 transition mb-1 pr-2",
          isActive && "text-[#bf1e2e] hover:text-[#bf1e2e] bg-[#bf1e2e]/40 hover:bg-[#bf1e2e]/40 dark:bg-[#bf1e2e]/20 dark:hover:bg-[#bf1e2e]/20"
        )}
      >
        <div className="flex items-center gap-x-2 py-4">
          <Icon
            size={22}
            className={cn(
              "text-slate-500",
              isActive && "text-[#bf1e2e] animate-spin-left-right",
            )} />
          {label}
        </div>
        {isNew && (
          <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-sky-500/10 text-sky-800 ml-auto">
          New
        </div>
        )}
      </button>
  )
}