import { Category, Post } from "@prisma/client";

import { PostCard } from "./post-card";

type PostWithProgressWithCategory = Post & {
  category: Category | null;
  likesCount: number;
  currentLike: boolean;
  commentsWithLikes: any;
};

interface PostListProps {
  items: PostWithProgressWithCategory[];
  getPosts: any;
  isLoading: boolean;
}

export const PostList = ({ items, getPosts, isLoading }: PostListProps) => {
  const sortedItems = items.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  return (
    // Use flex layout to center the content
    <div className="flex flex-col items-center justify-center">
      {/* Add responsive padding, and max-width to center on large screens */}
      <div className="w-full max-w-2xl px-5">
        {sortedItems.map((item) => (
          <PostCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            category={item?.category?.name!}
            description={item.description ?? ""}
            createdAt={new Date(item.createdAt).toDateString()}
            publisherName={item.publisherName!}
            publisherImageUrl={item.publisherImageUrl!}
            colorCode={item?.category?.colorCode!}
            likesCount={item?.likesCount}
            currentLike={item?.currentLike}
            commentsWithLikes={item.commentsWithLikes}
            getPosts={getPosts}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="mt-10 text-center text-sm text-muted-foreground">
          {isLoading ? "Loading...." : "No posts found"}
        </div>
      )}
    </div>
  );
};
