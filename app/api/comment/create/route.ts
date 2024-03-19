import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (userId == null) {
      throw new Error("Un Authorized");
    }
    const requestBody = await req.json();

    const { text, postId, parentCommentId, liveEventId } = requestBody;

    const profile = await db.profile.findFirst({
      select: {
        id: true,
      },
      where: { userId: userId },
    });
    if (profile == null) {
      throw new Error("Profile not found");
    }
    const comment = await db.comment.create({
      data: {
        text: text,
        postId: postId,
        profileId: profile.id,
        parentCommentId: parentCommentId,
        liveEventId,
      },
    });

    return NextResponse.json({ data: comment });
  } catch (error) {
    console.log("[SUBSCRIPTION]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
