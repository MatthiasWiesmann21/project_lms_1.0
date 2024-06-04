import { db } from "@/lib/db";
import Wrapper from "./_components/wrapper";
import { getPosts } from "@/actions/get-posts";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const NewsPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
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

  const container = await db?.container?.findUnique({
    where: {
      id: process.env.CONTAINER_ID,
    },
  });

  const posts = await getPosts({
    userId,
    ...searchParams,
    // containerId: process.env.CONTAINER_ID,
  });

  return (
    <Wrapper posts={posts} categories={categories} container={container} />
  );
};

export default NewsPage;
