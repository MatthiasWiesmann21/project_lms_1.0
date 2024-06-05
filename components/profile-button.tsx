import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/check-language";
import { LogOutIcon, UserCog2Icon } from "lucide-react";
import { UserAvatar } from "./user-avatar";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface ProfileButtonProps {
  profileId: string;
  profileName: string;
  profileImageUrl: string;
}
 
const ProfileButton = (
  { profileName, profileImageUrl }: ProfileButtonProps
) => {
  const currentLanguage = useLanguage();
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="border-0 bg-transparent w-6 h-6 rounded-xl" variant="ghost">
          <UserAvatar src={profileImageUrl} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-1">
        <DropdownMenuItem onClick={() => router.push("/profile/manageUsername")}>
        <div className="cursor-pointer hover:drop-shadow-md transition">
          <UserAvatar src={profileImageUrl} />
        </div>
        <div className="font-semibold pl-2 text-sm cursor-pointer">
          {profileName}
        </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/profile/manageProfile")}>
          <UserCog2Icon className="mr-2 h-6 w-6" />
          {currentLanguage.profile_manageAccount}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut(() => router.push("sign-in"))}>
          <LogOutIcon className="mr-2 h-6 w-6" />
          {currentLanguage.profile_signOut}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
