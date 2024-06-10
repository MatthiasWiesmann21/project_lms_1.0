import { Hash } from "lucide-react";

import { UserAvatar } from "@/components/user-avatar";
import { SocketIndicator } from "@/components/socket-indicator";

import { ChatVideoButton } from "./chat-video-button";
import leftArrow from "../../assets/icons/left arrow.png";
import Image from "next/image";
import { MobileSidebarChat } from "@/app/(dashboard)/_components/mobile_sidebar_chat";

interface ChatHeaderProps {
  serverId: string;
  name: string | null;
  type: "channel" | "conversation";
  imageUrl?: string;
}

export const ChatHeader = ({
  serverId,
  name,
  type,
  imageUrl,
}: ChatHeaderProps) => {
  return (
    <div className="text-md sticky flex h-12 items-center border-b-2 border-neutral-200 px-3 font-semibold dark:border-neutral-800">
      <MobileSidebarChat serverId={serverId} />
      {type === "channel" && (
        <Hash className="mr-2 h-5 w-5 text-zinc-500 dark:text-zinc-400" />
      )}
      {type === "conversation" && (
        <UserAvatar src={imageUrl} className="mr-2 h-8 w-8 md:h-8 md:w-8" />
      )}
      <p className="text-md font-semibold text-black dark:text-white">{name}</p>
      <div className="ml-auto flex items-center">
        {type === "conversation" && <ChatVideoButton />}
        <SocketIndicator />
      </div>
    </div>
  );
};
