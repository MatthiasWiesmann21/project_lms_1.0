import { NavbarRoutes } from "@/components/navbar-routes";

import { MobileSidebar } from "./mobile-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";

export const Navbar = async () => {
  const profile = await currentProfile();

  const profileId = profile?.id || "";
  const profileName = profile?.name || "";
  const profileImageUrl = profile?.imageUrl || "";
  return (
    <div className="flex h-full items-center border-b bg-white p-4 shadow-sm dark:bg-[#0A0118]">
      <MobileSidebar />
      <NavbarRoutes profileId={profileId} profileName={profileName} profileImageUrl={profileImageUrl}/>
    </div>
  );
};
