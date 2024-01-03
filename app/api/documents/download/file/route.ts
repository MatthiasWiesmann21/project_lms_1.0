import createFolder from "@/app/vendor/aws/s3/createFolder";
import getS3SignedUrl from "@/app/vendor/aws/s3/getS3SignedUrl";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Duration } from "luxon";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: any) {
  try {
    const { userId } = auth();

    // Authenticate User here for downloading different files

    const key = req.nextUrl.searchParams.get("key"); // file to download

    const downloadUrl = await getS3SignedUrl({
      fileKey: key,
      duration: Duration.fromObject({
        minutes: 30,
      }),
    });

    return NextResponse.json({
      data: {
        downloadUrl: downloadUrl,
      },
    });
  } catch (error) {
    console.log("[SUBSCRIPTION]  ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
