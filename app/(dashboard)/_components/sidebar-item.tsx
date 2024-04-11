"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { log } from "console";
import { useTheme } from "next-themes";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isNew?: boolean;
  navPrimaryColor: string;
  navBackgroundColor: string;
  navDarkPrimaryColor: string;
  navDarkBackgroundColor: string;
};

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
  isNew,
  navPrimaryColor,
  navBackgroundColor,
  navDarkPrimaryColor,
  navDarkBackgroundColor,
}: SidebarItemProps) => {
  const { theme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  }

  const staticStyles = {
    margin: '0.25rem', // m-1
    paddingLeft: '0.5rem', // pl-2
    fontSize: '0.875rem', // text-sm
    borderRadius: '0.5rem', // rounded-lg
    display: 'flex', // flex
    alignItems: 'center', // items-center
    transition: 'all 0.2s ease-in-out', // transition
    marginBottom: '0.25rem', // mb-1
    paddingRight: '0.5rem', // pr-2
  };
  
  const dynamicStyles = isActive ? {
    color: navPrimaryColor,
    backgroundColor: navBackgroundColor, // bg-sky-200/50
    // Note: For hover and dark mode styles, you'd typically use CSS classes or JavaScript as inline styles don't support these features directly.
  } : {};

  const iconDynamicStyles = isActive ? {
    color: navPrimaryColor,
  } : {};

  const darkModeDynamicStyles = theme === 'dark' && isActive ? {
    color: navDarkPrimaryColor,
    backgroundColor: navDarkBackgroundColor,
  } : {};

  const iconDarkModeDynamicStyles = theme === 'dark' && isActive ? {
    color: navDarkPrimaryColor,
  } : {};

  const combinedStyles = { ...staticStyles, ...dynamicStyles, ...(theme === 'dark' ? darkModeDynamicStyles : {}), };

  return (
     <button
        onClick={onClick}
        type="button"
        style={combinedStyles}
        className={cn(
          "m-1 pl-2 text-sm rounded-lg flex items-center hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1 pr-2",
          isActive && `hover:text-sky-700 bg-sky-200/50 hover:bg-sky-200/50 dark:bg-sky-200/10 dark:hover:bg-sky-200/10`
        )}
      >
        <div className="flex items-center gap-x-2 py-4">
          <Icon
            size={22}
            style={{...iconDynamicStyles, ...(theme === 'dark' ? iconDarkModeDynamicStyles : {})}}
            className={cn(
              "text-slate-500",
              isActive && "text-sky-700 animate-spin-left-right",
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