"use client";

import { useLanguage } from "@/lib/check-language";
import { Button } from "../ui/button";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface IsBannedViewProps {
  profile: { id: string; isBanned: string } | null;
}

const IsBannedView = ({
  profile,
}: IsBannedViewProps) => {
  const currentLanguage = useLanguage();
  const { signOut } = useClerk();
  const router = useRouter()


if (profile?.isBanned === "NOT BANNED") return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-slate-400 z-50">
      <div className="bg-slate-100 p-12 rounded-xl shadow-xl">
        <p className="text-black flex font-bold text-2xl justify-center">Your account has been banned.</p>
        <p className="text-black">Please, message an Admin to unban your account on this Plattform.</p>
        <Button variant="primary" className="p-4 mt-4 w-full font-bold" onClick={() => signOut(() => router.push("/"))}>
           Sign Out
        </Button>
      </div>
    </div>
  );
}

export default IsBannedView;
