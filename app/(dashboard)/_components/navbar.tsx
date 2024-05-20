import { NavbarRoutes } from "@/components/navbar-routes";

import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <div className="flex h-full items-center border-b bg-white p-4 shadow-sm dark:bg-[#0A0118]">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};
