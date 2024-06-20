"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
  EllipsisVertical,
  // @ts-ignore
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";
import { useLanguage } from "@/lib/check-language";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ServerHeaderProps {
  servers: any[];
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

export const ServerHeader = ({ servers, server, role }: ServerHeaderProps) => {
  const { push } = useRouter();
  const { onOpen } = useModal();
  const currentLanguage = useLanguage();
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <div className="relative flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none" asChild>
          <button className="text-md flex h-12 w-full items-center px-3 font-semibold transition hover:bg-zinc-700/10 dark:border-neutral-800 dark:hover:bg-zinc-700/50">
            <Image
              src={server?.imageUrl}
              alt="server?.imagUrl"
              width={24}
              height={24}
            />
            <span className="mx-3 text-[16px] font-[600] dark:text-[#baa5c1]">
              {server?.name}
            </span>
            <ChevronDown className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 space-y-[2px] bg-[#f6f8fa] text-xs font-medium text-black dark:bg-[#101828] dark:text-neutral-400">
          {servers?.map((each: ServerWithMembersWithProfiles) => (
            <DropdownMenuItem
              onClick={() => push(`/chat/servers/${each?.id}`)}
              className="flex h-[40px] cursor-pointer items-center p-0 text-sm text-indigo-600 dark:text-indigo-400"
            >
              <Image
                src={each?.imageUrl}
                alt="each?.imageUrl"
                objectFit="contain"
                width={16}
                height={16}
                className="mr-3"
              />
              <span className=" text-[16px] font-[600] dark:text-[#baa5c1]">
                {each?.name}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="absolute right-0">
        <DropdownMenu>
          <DropdownMenuTrigger
            className="focus:outline-none"
            asChild
            // style={{ border: "2px solid green" }}
          >
            <button
              // style={{ border: "2px solid blue" }}
              className="text-md mr-2 flex items-center justify-center rounded-[100%] border border-2 border-[#ea2088] p-1 font-semibold transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50"
            >
              <EllipsisVertical className="text-[gray] dark:text-[white]" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 space-y-[2px] text-xs font-medium text-black dark:text-neutral-400">
            {isModerator && (
              <DropdownMenuItem
                onClick={() => onOpen("invite", { server })}
                className="cursor-pointer px-3 py-2 text-sm text-indigo-600 dark:text-indigo-400"
              >
                {currentLanguage.chat_server_invite}
                <UserPlus className="ml-auto h-4 w-4" />
              </DropdownMenuItem>
            )}
            {isAdmin && (
              <DropdownMenuItem
                onClick={() => onOpen("editServer", { server })}
                className="cursor-pointer px-3 py-2 text-sm"
              >
                {currentLanguage.chat_server_edit}
                <Settings className="ml-auto h-4 w-4" />
              </DropdownMenuItem>
            )}
            {isAdmin && (
              <DropdownMenuItem
                onClick={() => onOpen("members", { server })}
                className="cursor-pointer px-3 py-2 text-sm"
              >
                {currentLanguage.chat_server_manage_members}
                <Users className="ml-auto h-4 w-4" />
              </DropdownMenuItem>
            )}
            {isModerator && (
              <DropdownMenuItem
                onClick={() => onOpen("createChannel")}
                className="cursor-pointer px-3 py-2 text-sm"
              >
                {currentLanguage.chat_server_create_channel}
                <PlusCircle className="ml-auto h-4 w-4" />
              </DropdownMenuItem>
            )}
            {isModerator && <DropdownMenuSeparator />}
            {isAdmin && (
              <DropdownMenuItem
                onClick={() => onOpen("deleteServer", { server })}
                className="cursor-pointer px-3 py-2 text-sm text-rose-500"
              >
                {currentLanguage.chat_server_delete}
                <Trash className="ml-auto h-4 w-4" />
              </DropdownMenuItem>
            )}
            {!isAdmin && (
              <DropdownMenuItem
                onClick={() => onOpen("leaveServer", { server })}
                className="cursor-pointer px-3 py-2 text-sm text-rose-500"
              >
                Leave Server
                <LogOut className="ml-auto h-4 w-4" />
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
