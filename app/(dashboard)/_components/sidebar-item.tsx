"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
};

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
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
          "m-1 pl-2 text-sm rounded-lg flex items-center hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1 pr-2",
          isActive && "text-sky-700 hover:text-sky-700 bg-sky-200/50 hover:bg-sky-200/50 dark:bg-sky-200/10 dark:hover:bg-sky-200/10"
        )}
      >
        <div className="flex items-center gap-x-2 py-4">
          <Icon
            size={22}
            className={cn(
              "text-slate-500",
              isActive && "text-sky-700 animate-spin-left-right",
            )} />
          {label}
        </div>
      </button>
  )
}