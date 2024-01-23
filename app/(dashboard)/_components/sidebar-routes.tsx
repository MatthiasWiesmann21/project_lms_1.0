"use client";

import {
  BarChart,
  Compass,
  FolderOpen,
  Globe,
  Globe2,
  Layout,
  List,
  Mail,
  MessageCircle,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
  {
    icon: Globe2,
    label: "Social Media",
    href: "/social-media",
  },
  {
    icon: Mail,
    label: "Newsletter",
    href: "/newsletter",
  },
  {
    icon: MessageCircle,
    label: "Chat",
    href: "/chat",
  },
  {
    icon: FolderOpen,
    label: "Documents",
    href: "/documents",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
  {
    icon: Mail,
    label: "Mail List",
    href: "/teacher/mail-list",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex w-full flex-col">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
