import { useEffect, useState, useRef } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { PostCard } from "./_components/post-card";
import { Category, Post } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/check-language";
import NewsWrapper from "./_components/newsWrapper";
import { db } from "@/lib/db";

type PostWithProgressWithCategory = Post & {
  category: Category | null;
  likesCount: number;
  currentLike: boolean;
  commentsWithLikes: any;
  commentsCount: number;
};

interface SearchPageProps {
  searchParams: {
    categoryId: string;
  };
}

const NewsPage = async ({ searchParams }: SearchPageProps) => {
  const categories = await db?.category?.findMany({
    where: {
      isPublished: true,
      isNewsCategory: true,
      containerId: process.env.CONTAINER_ID,
    },
    orderBy: {
      name: "asc",
    },
    include: {
      _count: {
        select: { posts: true },
      },
    },
  });

  const container: any = await db?.container?.findUnique({
    where: {
      id: process.env.CONTAINER_ID,
    },
  });

  return (
    <NewsWrapper
      searchParams={searchParams}
      categories={categories}
      defaultColor={container?.navDarkBackgroundColor}
    />
  );
};

export default dynamic(() => Promise?.resolve(NewsPage), { ssr: false });
