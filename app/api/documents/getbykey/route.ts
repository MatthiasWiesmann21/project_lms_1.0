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

    const key = req.nextUrl.searchParams.get("key");
    let id = null;
      const idData = await db.folder.findFirst({
        select: {
          id: true,
        },
        where: { key: key },
      });
      //@ts-ignore
      id = idData.id;

    return NextResponse.json({ data: id });
  } catch (error) {
    console.log("[SUBSCRIPTION]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
