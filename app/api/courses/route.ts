import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { useIsOwner } from "@/lib/owner";

export async function POST(
  req: Request,
) {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId || !useIsOwner(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.create({
      data: {
        userId,
        title,
        containerId: process.env.CONTAINER_ID || '',
      }
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}