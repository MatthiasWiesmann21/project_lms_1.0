import { auth } from "@clerk/nextjs";
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

export async function GET(req: any): Promise<void | Response> {
  try {
    const { userId } = auth();
    const page = req?.nextUrl?.searchParams?.get("page") || "1";
    const pageSize = 5;
    const skip = (parseInt(page) - 1) * pageSize;

    if (userId === null) throw new Error("Un Authorized");

    const profile = await db?.profile?.findFirst({
      select: {
        id: true,
      },
      where: {
        userId: userId,
      },
    });

    if (profile === null)
      return new NextResponse("Profile not found", { status: 404 });

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
      take: pageSize,
      skip: skip,
    });

    const postsWithData = posts?.map((post) => {
      const commentsCount = post?.comments?.length;
      const likesCount = post?.likes?.length;

      const commentsWithLikes = post?.comments
        ?.map((comment) => ({
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
        }))
        //@ts-ignore
        ?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));

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
