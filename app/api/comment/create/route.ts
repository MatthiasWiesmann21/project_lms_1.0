import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // POST /api/upload
  try {
    const { userId } = auth();

    if (userId == null) {
      throw new Error("Un Authorized");
    }
    const requestBody = await req.json();

    const { text, postId, profileId, parentCommentId } = requestBody;

    const comment = await db.comment.create({
      data: {
        text: text,
        postId: postId,
        profileId: profileId,
        parentCommentId: parentCommentId,
      },
    });

    return NextResponse.json({ data: comment });
  } catch (error) {
    console.log("[SUBSCRIPTION]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
