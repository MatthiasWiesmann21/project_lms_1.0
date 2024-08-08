"use client";

import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CourseSidebarItemProps {
  label: string;
  id: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
};

export const CourseSidebarItem = ({
  label,
  id,
  isCompleted,
  courseId,
  isLocked,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle);
  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            type="button"
            className={cn(
              "flex items-center gap-x-2 text-sm font-[500] pl-2 transition-all hover:bg-slate-300/20",
              isActive && " bg-slate-200/20 hover:bg-slate-200/20 ",
              isCompleted && "text-emerald-700 hover:text-emerald-700",
              isCompleted && isActive && "bg-emerald-200/20",
            )}
          >
            <div className="flex items-center py-4">
              <div className="pr-1">
              <Icon
                size={18}
                className={cn(
                  "text-black w-12 dark:text-white transition-all",
                  isActive && "text-slate-500 w-12",
                  isCompleted && "text-emerald-60 w-12"
                )}
              />
              </div>
              <span className="line-clamp-2 text-start">
                {label}
              </span>
            </div>
            <div className={cn(
              "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
              isActive && "opacity-100",
              isCompleted && "border-emerald-700"
            )} />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-2">
          <p className="font-semibold whitespace-normal">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
