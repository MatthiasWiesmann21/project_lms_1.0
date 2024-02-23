import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { useIsOwner } from "@/lib/owner";

export async function POST(
  req: Request,
) {
  try {
    const { userId } = auth();
    const { name, color } = await req.json();

    if (!userId || !useIsOwner(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const category = await db.category.create({
      data: {
        name: name,
        colorCode: color,
        containerId: process.env.CONTAINER_ID || '',
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}