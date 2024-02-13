import createFolder from "@/app/vendor/aws/s3/createFolder";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { isTeacher } from "@/lib/teacher";

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
