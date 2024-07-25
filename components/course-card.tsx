"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "@/components/course-progress";
import book from "@/assets/icons/book.png";
import { useState } from "react";
import { useTheme } from "next-themes";

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
    <Link
      href={`/courses/${id}`}
      className="border-2 rounded-lg transition duration-500 ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderColor: isHovered ? getBorderColor() : "transparent",
      }}
    >
      <div
        className="bg-slate-100/60 dark:bg-[#0c0319] group h-full w-full overflow-hidden rounded-lg p-2 transition"
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-md border-2 border-slate-300/50 dark:border-slate-700/60">
          <Image fill className="object-cover" alt={title} src={imageUrl} />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span
            style={{ borderColor: categoryColorCode }}
            className="flex items-center rounded-[12px] border-2 px-3 py-1 text-[12px]"
          >
            {category}
          </span>
          <div className="flex items-center">
            <div className="mr-2 h-[30px] w-[30px]">
              <Image
                alt="book"
                src={book}
                className="object-cover"
              />
            </div>
            <span className="text-[12px]">
              {chaptersLength} {chaptersLength < 2 ? "Chapter" : "Chapters"}
            </span>
          </div>
        </div>
        <div className="flex flex-col pt-2">
          <div className="my-2 line-clamp-2 text-[16px] font-semibold">
            {title}
          </div>
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
  );
};
