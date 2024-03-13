import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isOwner } from "@/lib/owner";
import { isAdmin, isOperator } from "@/lib/roleCheckServer";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    const isRoleAdmins = await isAdmin();
    const isRoleOperator = await isOperator();
    const canAccess = isRoleAdmins || isRoleOperator || isOwner(userId);

    if (!userId || !canAccess) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const post = await db.post.create({
      data: {
        title,
        containerId: process.env.CONTAINER_ID || "",
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: any) {
  try {
    const { userId } = auth();
    const title = req?.nextUrl?.searchParams?.get("title");
    const categoryId = req?.nextUrl?.searchParams?.get("categoryId");
    const limit = req?.nextUrl?.searchParams?.get("limit") || 100;

    if (userId === null) throw new Error("Un Authorized");

    const profile = await db?.profile?.findFirst({
      select: {
        id: true,
      },
      where: {
        userId: userId,
      },
    });

    if (profile === null) return [];

    const posts = await db?.post?.findMany({
      where: {
        isPublished: true,
        containerId: process.env.CONTAINER_ID,
      },
      include: {
        category: true,
        comments: {
          include: {
            likes: true,
            subComment: {
              include: {
                likes: true,
                profile: true,
              },
            },
            profile: true,
          },
          where: {
            parentComment: null,
          },
        },
        likes: true,
      },
      // take: limit,
    });

    const postsWithData = posts?.map((post) => {
      const commentsCount = post?.comments?.length;
      const likesCount = post?.likes?.length;

      const commentsWithLikes = post?.comments?.map((comment) => ({
        ...comment,
        commentLikesCount: comment?.likes?.length,
        currentCommentLike: comment?.likes?.some(
          (like) => like.profileId === profile.id
        ),
        subCommentsWithLikes: comment?.subComment?.map((subcomment) => ({
          ...subcomment,
          commentLikesCount: subcomment?.likes?.length,
          currentCommentLike: subcomment?.likes?.some(
            (like) => like?.profileId === profile?.id
          ),
        })),
      }));

      // Check if the current profile has liked the post
      const currentLike = post?.likes?.some(
        (like) => like?.profileId === profile?.id
      );

      // Return the post data along with the calculated counts and like state
      return {
        ...post,
        commentsCount,
        likesCount,
        currentLike,
        commentsWithLikes,
      };
    });

    return NextResponse.json({ data: postsWithData });
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
