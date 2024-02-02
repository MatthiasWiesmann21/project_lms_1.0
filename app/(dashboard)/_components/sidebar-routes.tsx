"use client";

import {
  BarChartIcon,
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
    icon: LayoutGridIcon,
    label: "Categories",
    href: "/teacher/categories",
  },
  {
    icon: MailIcon,
    label: "Mail List",
    href: "/teacher/mail-list",
  },
  {
    icon: BarChartIcon,
    label: "Analytics",
    href: "/teacher/analytics",
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
