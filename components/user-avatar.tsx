import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import profileNot from "@/assets/icons/profileNot.png";

interface UserAvatarProps {
  src?: string;
  className?: string;
}

export const UserAvatar = ({ src, className }: UserAvatarProps) => {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
      {src ? (
        <AvatarImage src={src} />
      ) : (
        <Image alt="profileNot" src={profileNot} />
      )}
    </Avatar>
  );
};
