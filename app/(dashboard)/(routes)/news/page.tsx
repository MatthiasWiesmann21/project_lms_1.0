"use client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { PostCard } from "./_components/post-card";
import { Category, Post } from "@prisma/client";
import { Loader2 } from "lucide-react";

type PostWithProgressWithCategory = Post & {
  category: Category | null;
  likesCount: number;
  currentLike: boolean;
  commentsWithLikes: any;
  commentsCount: number;
};

const NewsPage = () => {
  const [posts, setPosts] = useState<PostWithProgressWithCategory[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Track the current page
  const [hasMore, setHasMore] = useState(true); // Track if there are more posts to load
  const observer = useRef<IntersectionObserver | null>(null);

  const getPosts = async () => {
    setLoading(true);
    const response = await axios?.get(`/api/posts?page=${page}`);
    const newPosts = response?.data?.data ?? [];
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setLoading(false);
    setPage((prevPage) => prevPage + 1); // Increment the page count
    setHasMore(newPosts.length > 0); // Check if there are more posts to load
  };

  useEffect(() => {
    // Create an intersection observer
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore && !isLoading) {
          getPosts(); // Fetch more posts when the loading indicator becomes visible
        }
      },
      { threshold: 1 }
    );

    // Observe the loading indicator
    if (observer?.current) {
      //@ts-ignore
      observer?.current?.observe(document?.querySelector(".loading-indicator"));
    }

    // Clean up
    return () => {
      if (observer?.current) {
        observer?.current?.disconnect();
      }
    };
  }, [hasMore, isLoading]); // Re-run effect when hasMore or isLoading changes

  return (
    <div className="space-y-4 pt-2 dark:bg-[#313338]">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl px-5">
          {posts?.map((item) => (
            <PostCard
              key={item?.id}
              id={item?.id}
              title={item?.title}
              imageUrl={item?.imageUrl!}
              category={item?.category?.name!}
              description={item?.description ?? ""}
              createdAt={new Date(item?.createdAt).toDateString()}
              publisherName={item?.publisherName!}
              publisherImageUrl={item?.publisherImageUrl!}
              colorCode={item?.category?.colorCode!}
              likesCount={item?.likesCount}
              currentLike={item?.currentLike}
              commentsWithLikes={item?.commentsWithLikes}
              commentsCount={item?.commentsCount}
              getPosts={getPosts}
            />
          ))}
        </div>
        <div className="loading-indicator" />
        {isLoading ? (
          <div className="flex justify-center items-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin"/>
          </div>
        ) : (
          !isLoading &&
          posts?.length === 0 && (
            <div className="mt-10 text-center text-sm text-muted-foreground">
              No posts found
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default dynamic(() => Promise?.resolve(NewsPage), { ssr: false });
