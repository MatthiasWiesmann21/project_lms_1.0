import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function DELETE(
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
        containerId: process.env.CONTAINER_ID,
      }
    });

    if (!post) {
      return new NextResponse("Not found", { status: 404 });
    }

    const deletedPost = await db.post.delete({
      where: {
        id: params.postId,
        containerId: process.env.CONTAINER_ID,
      },
    });

    return NextResponse.json(deletedPost);
  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const { userId } = auth();
    const { postId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const post = await db.post.update({
      where: {
        id: postId,
        containerId: process.env.CONTAINER_ID,
      },
      data: {
        ...values,
      }
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}