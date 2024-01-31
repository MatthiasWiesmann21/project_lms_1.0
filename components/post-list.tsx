import { Category, Post } from "@prisma/client";

import { PostCard } from "@/components/post-card";

type PostWithProgressWithCategory = Post & {
  category: Category | null;
};

interface PostListProps {
  items: PostWithProgressWithCategory[];
}

export const PostList = ({
  items
}: PostListProps) => {
  return (
    // Use flex layout to center the content
    <div className="flex flex-col items-center justify-center">
      {/* Add responsive padding, and max-width to center on large screens */}
      <div className="px-5 w-full max-w-2xl">
        {items.map((item) => (
          <PostCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            category={item?.category?.name!}
            description={item.description ?? ''}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No posts found
        </div>
      )}
    </div>
  )
}
