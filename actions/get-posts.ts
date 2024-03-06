import { Category, Post } from "@prisma/client";

import { db } from "@/lib/db";

type PostWithProgressWithCategory = Post & {
  category: Category | null;
};

type GetPosts = {
  userId?: string;
  title?: string;
  categoryId?: string;
};

export const getPosts = async ({
  userId,
  title,
  categoryId
}: GetPosts): Promise<PostWithProgressWithCategory[]> => {
  try {
    const posts = await db.post.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
        containerId: process.env.CONTAINER_ID,
      },
      include: {
        category: true,
        comments: true,
        likes: true,
      },
    });

    const postsWithData = posts.map(post => {
      const commentsCount = post.comments.length;
      const likesCount = post.likes.length;
      
      // Check if the current profile has liked the post
      const currentLike = post.likes.some(like => like.profileId === userId);
    
      // Return the post data along with the calculated counts and like state
      return {
        ...post,
        commentsCount,
        likesCount,
        currentLike,
      };
    });

    return postsWithData;
  } catch (error) {
    console.log("[GET_POSTS]", error);
    return [];
  }
}