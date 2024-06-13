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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useDispatch } from "react-redux";

interface ProfileButtonProps {
  profileId: string;
  profileName: string;
  profileImageUrl: string;
}

const ProfileButton = ({
  profileName,
  profileImageUrl,
}: ProfileButtonProps) => {
  const currentLanguage = useLanguage();
  const { signOut } = useClerk();
  const router = useRouter();

  const dispatch = useDispatch();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="h-6 w-6 rounded-xl border-0 bg-transparent"
                variant="ghost"
              >
                <UserAvatar src={profileImageUrl} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="p-1">
              <DropdownMenuItem
                onClick={() => router.push("/profile/manageUsername")}
              >
                <div className="cursor-pointer transition hover:drop-shadow-md">
                  <UserAvatar src={profileImageUrl} />
                </div>
                <div className="cursor-pointer pl-2 text-sm font-semibold">
                  {profileName}
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/profile/manageProfile")}
              >
                <UserCog2Icon className="mr-2 h-6 w-6" />
                {currentLanguage.profile_manageAccount}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  signOut(() => {
                    dispatch({ type: "SetUser", payload: {} });
                    router.push("sign-in");
                  })
                }
              >
                <LogOutIcon className="mr-2 h-6 w-6" />
                {currentLanguage.profile_signOut}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {currentLanguage.navigation_profile_tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ProfileButton;
