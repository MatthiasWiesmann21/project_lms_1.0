import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  // POST /api/upload
  try {
    const { userId } = auth();
    // console.log

    const id = req.nextUrl.searchParams.get("id");
    let key = null;
    const keyData = await db.folder.findFirst({
      select: {
        key: true,
        name: true,
        isPublic: true,
        parentFolderId: true,
      },
      where: { id: id },
    });
    //@ts-ignore
    key = keyData.key;

    return NextResponse.json({ data: keyData });
  } catch (error) {
    console.log("[SUBSCRIPTION]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
