"use client";

import {
  BarChartIcon,
  CalendarCheck2,
  ClapperboardIcon,
  Compass,
  FolderOpen,
  Globe2,
  GraduationCap,
  Layout,
  LayoutGridIcon,
  ListIcon,
  MessageCircle,
  NewspaperIcon,
  PaletteIcon,
  Trophy,
  UserCircle2Icon,
  Video,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";
import { useSelector } from "react-redux";

const userRoutes = [
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
    isNew: false,
  },
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
    isNew: false,
  },
  {
    icon: Globe2,
    label: "News",
    href: "/news",
    isNew: false,
  },
  {
    icon: Video,
    label: "Live Event",
    href: "/live-event",
    isNew: false,
  },
  {
    icon: MessageCircle,
    label: "Chat",
    href: "/chat",
    isNew: false,
  },
  {
    icon: FolderOpen,
    label: "Documents",
    href: "/documents",
    isNew: false,
  },
  {
    icon: Trophy,
    label: "Trainingscenter",
    href: "/trainingscenter",
    isNew: false,
  },
  {
    icon: CalendarCheck2,
    label: "Calendar",
    href: "/calendar",
    isNew: false,
  },
  {
    icon: GraduationCap,
    label: "Knowledge-Library",
    href: "/knowledge-hub",
    isNew: false,
  },
];

const packageStarterRoutes = [
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
    isNew: false,
  },
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
    isNew: false,
  },
  {
    icon: Globe2,
    label: "News",
    href: "/news",
    isNew: false,
  },
];

const AdministrationRoutes = [
  {
    icon: ListIcon,
    label: "Courses",
    href: "/admin/courses",
    isNew: false,
  },
  {
    icon: NewspaperIcon,
    label: "Posts",
    href: "/admin/posts",
    isNew: false,
  },
  {
    icon: ClapperboardIcon,
    label: "Live Event",
    href: "/admin/live-event",
    isNew: false,
  },
  {
    icon: LayoutGridIcon,
    label: "Categories",
    href: "/admin/categories",
    isNew: false,
  },
  {
    icon: PaletteIcon,
    label: "Customize",
    href: "/admin/customize",
    isNew: false,
  },
  {
    icon: UserCircle2Icon,
    label: "Users",
    href: "/admin/users",
    isNew: false,
  },
  {
    icon: BarChartIcon,
    label: "Analytics",
    href: "/admin/analytics",
    isNew: false,
  },
];



export const SidebarRoutes = () => {
  const client = useSelector((state: any) => state?.user);

  const pathname = usePathname();

  const isAdministrationPage = pathname?.includes("/admin");

  const routes = isAdministrationPage
    ? AdministrationRoutes
    : client?.container?.clientPackage === "STARTER"
    ? packageStarterRoutes
    : userRoutes;

  return (
    <div className="flex w-full flex-col">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
          isNew={route.isNew}
        />
      ))}
    </div>
  );
};
