"use client";

import { UserButton, WithUser, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { isTeacher } from "@/lib/teacher";

import { SearchInput } from "./search-input";
import { ModeToggle } from "./mode-toggle";
import { LanguageToggle } from "./language-toggle";

export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
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
        {isTeacherPage || isCoursePage ? (
          <Link href="/dashboard">
            <Button size="default" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
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