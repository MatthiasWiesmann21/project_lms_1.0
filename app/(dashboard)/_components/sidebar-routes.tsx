"use client";

import {
  BarChartIcon,
  ClapperboardIcon,
  Compass,
  FolderOpen,
  Globe2,
  Layout,
  LayoutDashboard,
  LayoutGridIcon,
  ListIcon,
  Mail,
  MailIcon,
  MessageCircle,
  NewspaperIcon,
  PaletteIcon,
  PinIcon,
  Server,
  ServerIcon,
  UserCircle2Icon,
  Video,
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
    label: "News",
    href: "/news",
  },
  {
    icon: Video,
    label: "Live Event",
    href: "/live-event",
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
    icon: ListIcon,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: NewspaperIcon,
    label: "Posts",
    href: "/teacher/posts",
  },
  {
    icon: ClapperboardIcon,
    label: "Live Event",
    href: "/teacher/live-event",
  },
  {
    icon: LayoutGridIcon,
    label: "Categories",
    href: "/teacher/categories",
  },
  {
    icon: PaletteIcon,
    label: "Customize",
    href: "/teacher/customize",
  },
  {
    icon: UserCircle2Icon,
    label: "Users",
    href: "/teacher/users",
  },
  {
    icon: BarChartIcon,
    label: "Analytics",
    href: "/teacher/analytics",
  },
  {
    icon: ServerIcon,
    label: "Clients",
    href: "/teacher/containers",
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
