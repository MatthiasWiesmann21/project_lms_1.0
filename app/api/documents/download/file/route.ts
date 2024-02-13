import createFolder from "@/app/vendor/aws/s3/createFolder";
import getS3SignedUrl from "@/app/vendor/aws/s3/getS3SignedUrl";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Duration } from "luxon";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

import { extname } from 'path'; // Importing extname function from Node.js path module

export async function GET(req: any) {
  try {
    const { userId } = auth();

    // Authenticate User here for downloading different files

    const key = req.nextUrl.searchParams.get("key"); // file to download


    const extensionData = await db.file.findFirst({
      select: {
        //@ts-ignore
        type: true,
        name: true,
      },

      where: { key: key },
    });
    //@ts-ignore
    const fileExtension = extensionData.type; // Removing the dot from the extension

    if (fileExtension == null) { return }

    //@ts-ignore
    const fileName = extensionData.name; // Removing the dot from the extension

    const downloadUrl = await getS3SignedUrl({
      fileKey: key,
      fileExtension: fileExtension,
      fileName: fileName,
      duration: Duration.fromObject({
        minutes: 30,
      }),
    });

    console.log({ fileExtension })

    return NextResponse.json({
      data: {
        downloadUrl: downloadUrl,
        fileExtension: fileExtension, // Including file extension in the response
      },
    });
  } catch (error) {
    console.log("[SUBSCRIPTION]  ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

