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
      },
    });

   

    return posts;
  } catch (error) {
    console.log("[GET_POSTS]", error);
    return [];
  }
}