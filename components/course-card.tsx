"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "@/components/course-progress";
import book from "@/assets/icons/book.png";
import { useState } from "react";
import { useTheme } from "next-themes";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
  categoryColorCode: string;
  ThemOutlineColor: string;
  DarkThemeOutlineColor: string;
}

export const FreeText = () => {
  return <p className="text-md font-medium text-slate-700 md:text-sm">Free</p>;
};

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
  categoryColorCode,
  ThemOutlineColor,
  DarkThemeOutlineColor,
}: CourseCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();

  const getBorderColor = () => {
    return theme === "dark" ? DarkThemeOutlineColor : ThemOutlineColor;
  };

  return (
    <TooltipProvider>
      <Link
        href={`/courses/${id}`}
        className="rounded-lg border-2 transition duration-500 ease-in-out"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          borderColor: isHovered ? getBorderColor() : "transparent",
        }}
      >
        <div className="group h-full w-full overflow-hidden rounded-lg bg-slate-100/60 p-2 transition dark:bg-[#0c0319]">
          <div className="relative aspect-video w-full overflow-hidden rounded-md border-2 border-slate-300/50 dark:border-slate-700/60">
            <Image fill className="object-cover" alt={title} src={imageUrl} />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <Tooltip>
              <TooltipTrigger>
                <span
                  style={{ borderColor: categoryColorCode }}
                  className="flex items-center rounded-[12px] border-2 px-3 py-1 text-[12px]"
                >
                  {category}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="whitespace-normal text-sm font-semibold">
                  {category}
                </p>
              </TooltipContent>
            </Tooltip>
            <div className="flex items-center">
              <div className="mr-2 h-[30px] w-[30px]">
                <Image alt="book" src={book} className="object-cover" />
              </div>
              <span className="text-[12px]">
                {chaptersLength} {chaptersLength < 2 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>
          <div className="flex flex-col pt-2">
            <Tooltip>
              <TooltipTrigger>
                <p className="my-2 line-clamp-2 text-start text-[16px] font-semibold">
                  {title}
                </p>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs p-2">
                <p className="whitespace-normal text-sm font-semibold">
                  {title}
                </p>
              </TooltipContent>
            </Tooltip>
            {progress !== null ? (
              <CourseProgress
                variant={progress === 100 ? "success" : "default"}
                size="sm"
                value={progress}
              />
            ) : (
              <p className="my-2 text-[16px] font-bold text-slate-700 dark:text-slate-200 md:text-sm">
                {price === 0 ? "Free" : formatPrice(price)}
              </p>
            )}
          </div>
        </div>
      </Link>
    </TooltipProvider>
  );
};
