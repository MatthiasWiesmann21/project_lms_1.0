import { getPosts } from "@/actions/get-posts";
import { PostList } from "./_components/post-list";
import { UserAvatar } from "@/components/user-avatar";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "News",
};

const NewsPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/dashboard");
  }

  const posts = await getPosts({
    // @ts-ignore
    sort: "createdAt",
  });

  return (
    <div className="space-y-4 p-6 dark:bg-[#313338]">
      <PostList
      //@ts-ignore
       items={posts} />
    </div>
  );
};

export default NewsPage;
