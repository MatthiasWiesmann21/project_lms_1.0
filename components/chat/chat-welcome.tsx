import { useLanguage } from "@/lib/check-language";
import { languageServer } from "@/lib/check-language-server";
import { Hash } from "lucide-react";

interface ChatWelcomeProps {
  name: string | null;
  type: "channel" | "conversation";
};

export const ChatWelcome = ({
  name,
  type
}: ChatWelcomeProps) => {
  const currentLnaguage = useLanguage();
  return (
    <div className="space-y-2 px-4 mb-4">
      {type === "channel" && (
        <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
          <Hash className="h-12 w-12 text-white" />
        </div>
      )}
      <p className="text-xl md:text-3xl font-bold">
        {type === "channel" ? `${currentLnaguage.chat_welcome_title}` : ""}{name}
      </p>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
        {type === "channel"
          ? `${currentLnaguage.chat_welcome_description}${name} ${currentLnaguage.chat_welcome_description2}`
          : `${currentLnaguage.chat_welcome_title_directMessage} ${name}`
        }
      </p>
    </div>
  )
}