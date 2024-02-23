"use client";

import { UserButton, WithUser, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useIsOwner } from "@/lib/owner";

import { SearchInput } from "./search-input";
import { ModeToggle } from "./mode-toggle";
import { LanguageToggle } from "./language-toggle";
import { useIsAdmin, useIsOperator } from "@/lib/roleCheck";

export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isAdmin = useIsAdmin();
  const isOperator = useIsOperator();
  const isOwner = useIsOwner(userId);
  
  const canAccess = isAdmin || isOperator || isOwner;

  const isAdministrationPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isDashboardPage = pathname === "/dashboard";
  const isSearchPage = pathname === "/search";
  const isLiveEventPage = pathname === "/live-event";

  return (
    <>
      {isSearchPage && (<div className="hidden md:block">
          <SearchInput />
        </div> )}
        {isDashboardPage && (<div className="hidden md:block">
          <SearchInput />
        </div> )}
        {isLiveEventPage && (<div className="hidden md:block">
          <SearchInput />
        </div> )}
      <div className="flex gap-x-2 ml-auto">
          <LanguageToggle />
          <ModeToggle />
        {isAdministrationPage || isCoursePage ? (
          <Link href="/dashboard">
            <Button size="default" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : canAccess ? (
          <Link href="/teacher/courses">
            <Button size="default" variant="ghost">
              <Settings className="h-4 w-4 mr-2" />
              Administration
            </Button>
          </Link>
        ) : null}
        <UserButton
          afterSignOutUrl="/dashboard"
        />
      </div>
    </>
  )
}