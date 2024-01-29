import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const post = await db.post.findUnique({
      where: {
        id: params.postId,
        userId,
      }
    });

    if (!post) {
      return new NextResponse("Not found", { status: 404 });
    }

    const publishedPost = await db.post.update({
      where: {
        id: params.postId,
        userId,
      },
      data: {
        isPublished: true,
      }
    });

    return NextResponse.json(publishedPost);
  } catch (error) {
    console.log("[COURSE_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}