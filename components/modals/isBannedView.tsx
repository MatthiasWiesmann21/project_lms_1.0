"use client";

import { useLanguage } from "@/lib/check-language";

interface IsBannedViewProps {
  profile: { id: string; isBanned: boolean } | null;
}

export default function IsBannedView({
  profile,
}: IsBannedViewProps) {
  const currentLanguage = useLanguage();

  if (profile?.isBanned) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-slate-300 p-12 rounded shadow-lg">
        <p className="text-black flex justify-center">Your account has been banned.</p>
        <p className="text-black">Please, message an Admin to unban your account on this Plattform.</p>
      </div>
    </div>
  );
}
