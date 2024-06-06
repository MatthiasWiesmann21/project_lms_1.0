"use client";

import { UserButton, WithUser, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { isOwner } from "@/lib/owner";

import { SearchInput } from "./search-input";
import { ModeToggle } from "./mode-toggle";
import { LanguageToggle } from "./language-toggle";
import { useIsAdmin, useIsOperator } from "@/lib/roleCheck";
import { useLanguage } from "@/lib/check-language";
import ProfileButton from "./profile-button";

interface NavbarRoutesProps {
  profileId: string;
  profileName: string;
  profileImageUrl: string;
}

export const NavbarRoutes = ({
  profileId,
  profileName,
  profileImageUrl,
}: NavbarRoutesProps) => {
  const { userId } = useAuth();
  const pathname = usePathname();
  const currentLanguage = useLanguage();

  const isAdmin = useIsAdmin();
  const isOperator = useIsOperator();

  const canAccess = isAdmin || isOperator || isOwner(userId);

  const isAdministrationPage = pathname?.startsWith("/admin");
  const isCoursePage = pathname?.includes("/courses");
  const isCourseListPage = pathname === "/dashboard/course-list";
  const isSearchPage = pathname === "/search";
  const isLiveEventPage = pathname === "/live-event";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      {isCourseListPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      {isLiveEventPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="ml-auto flex gap-x-1">
        <LanguageToggle />
        <ModeToggle />
        {isAdministrationPage || isCoursePage ? (
          <Link href="/dashboard">
            <Button size="default" variant="ghost">
              <LogOut className="mr-2 h-5 w-5" />
              {currentLanguage.navigation_administration_button_text_exit}
            </Button>
          </Link>
        ) : canAccess ? (
          <Link href="/admin/courses">
            <Button size="default" variant="ghost">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        ) : null}
        <div className="m-2 flex items-center justify-center">
          <ProfileButton profileId={profileId} profileName={profileName} profileImageUrl={profileImageUrl} />
        </div>
      </div>
    </>
  );
};
