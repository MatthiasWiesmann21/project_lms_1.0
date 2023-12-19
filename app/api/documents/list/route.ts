 
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
 
async function getFolderAndFiles(key: string | null) {
  let folder;

  if (key == null) {
    folder = await db.folder.findFirst({
      where: { parentFolderId: null },
      include: {
        subFolders: true,
        files: true,
      },
    });
  }
  if (key != null) {
    folder = await db.folder.findFirst({
      where: { key: key },
      include: {
        subFolders: true,
        files: true,
      },
    });
    return folder;
  }

  return folder;
}

type QueryParams = {
  key: string;
};

export async function GET(req: NextApiRequest) {
  // POST /api/upload
  try {
    const { userId } = auth();
   
    const { key } = (req.query as unknown as QueryParams) ?? {};

    console.log(key);
    if (userId == null) {
      throw new Error("Un Authorized");
    }

    const folder = await getFolderAndFiles(key);
    if (folder == null) {
      return NextResponse.json(
        {
          message: `Requested ${key} not found`,
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({ data: folder });
  } catch (error) {
    console.log("[SUBSCRIPTION]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
