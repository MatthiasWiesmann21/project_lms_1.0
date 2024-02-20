import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) return;
    const user = await db?.profile?.findFirst({
      where: { userId: userId },
    });
    return NextResponse?.json(user);
  } catch (error) {
    console.log("[Get User]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
