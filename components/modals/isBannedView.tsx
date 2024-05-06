"use client";

import { useLanguage } from "@/lib/check-language";

interface IsBannedViewProps {
  profile: { id: string; isBanned: boolean };
}

export default function IsBannedView({
  profile,
}: IsBannedViewProps) {
  const currentLanguage = useLanguage();

  if (profile?.isBanned) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <p className="text-black">Your account has been banned.</p>
      </div>
    </div>
  );
}
