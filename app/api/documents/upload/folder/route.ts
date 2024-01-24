import createFolder from "@/app/vendor/aws/s3/createFolder";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { v4 as uuidv4, v4 } from "uuid";

const getOrCreateParentFolder = async (parentKey?: string) => {
  if (parentKey != null) {
    const parentFolder = await db.folder.findFirst({
      where: {
        key: parentKey,
      },
    });
    if (parentFolder == null) {
      throw new Error("Parent Folder Not Found");
    }
    return parentFolder;
  }

  // folderId is null now check if root fodler exists
  let rootFolder = await db.folder.findFirst({
    where: {
      parentFolder: null,
    },
  });
  if (rootFolder == null) {
    const { userId } = auth();
    if (userId == null) {
      throw new Error("Login first to access");
    }
    // Create a root folder in S3 and add its path to db
    const key = `${userId}-root/`; // Adding slash at the end of key it will make a folder
    await createFolder(key);

    rootFolder = await db.folder.create({
      data: {
        name: key,
        key: key,
        userId: userId,
      },
    });
  }

  return rootFolder;
};

export async function POST(req: Request) {
  // POST /api/upload
  try {
    const { userId } = auth();

    if (userId == null) {
      throw new Error("Un Authorized");
    }
    const requestBody = await req.json();

    // FolderId null means it will upload in root folder
    const { parentKey, folderName } = requestBody;

    // create or  get a folder if not exist

    const parentFolder = await getOrCreateParentFolder(parentKey);

    const folderKey = `${parentFolder.key}${folderName}/`;

    // Check if folder already exist
    const tempFolder = await db.folder.findFirst({
      where: {
        key: folderKey,
      },
    });
    console.log({tempFolder})
    if (tempFolder != null) {
      return new NextResponse("Folder already created", { status: 200 });
    }
    // create folder

    const folder = await db.folder.create({
      data: {
        key: folderKey,
        name: folderName,
        userId: userId,
        parentFolderId: parentFolder.id,
      },
    });

    return NextResponse.json({ data: folder });
  } catch (error) {
    console.log("[SUBSCRIPTION]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}