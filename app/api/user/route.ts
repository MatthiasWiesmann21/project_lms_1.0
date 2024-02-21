import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    const user = await db?.profile?.findFirst({
      where: { userId: userId },
      include: {
        container: true,
      },
    });
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }
    return NextResponse?.json(user);
  } catch (error) {
    console.log("[Get User]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
