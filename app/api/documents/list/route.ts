import createFolder from "@/app/vendor/aws/s3/createFolder";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { isTeacher } from "@/lib/teacher";

const getOrCreateParentFolder = async (userId:string,parentKey?: string) => {
  if (parentKey != null) {
    const parentFolder = await db.folder.findFirst({
      where: {
        key: parentKey,
        userId:userId
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
      userId:userId
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
        isPublic: false,
        userId: userId,
      },
    });
  }

  return rootFolder;
};

async function getFolderAndFiles(key: string | null, userId: string | null, isPublicDirectory?: boolean) {
  let folder;

  if (userId == null) {
    throw new Error("Login first to access");
  }

  if (key == null) {
    folder = await db.folder.findFirst({
      where: { parentFolderId: null },
      include: {
        subFolders: {
          where: {
            OR: [
              { isPublic: true },
              { userId: userId },
            ],
          },
        },
        files: {
          where: {
            OR: [
              { isPublic: true },
              { userId: userId },
            ],
          },
        },
      },
    });
  }
  if (key != null && !isPublicDirectory) {
    folder = await db.folder.findFirst({
      where: { key: key },
      include: {
        subFolders: true,
        files: {
          where: {  isPublic: true },
        },
      },
    });
  }

  if (key != null && isPublicDirectory) {
    folder = await db.folder.findFirst({
      where: { key: key },
      include: {
        subFolders: {
          where: {  isPublic: true },
        },
        files: {
          where: {  isPublic: true },
        },
      },
    });
  }

 

  return folder;
}

type QueryParams = {
  key: string;
};

export async function GET(req: any) {
  // POST /api/upload
  try {
    const { userId } = auth();

    const key = req.nextUrl.searchParams.get("key");
    const isPublicDirectory = req.nextUrl.searchParams.get("isPublicDirectory");

    if (userId == null) {
      throw new Error("Un Authorized");
    }

    if(isTeacher(userId)){
      await getOrCreateParentFolder(userId);
    }
    
    let parseKey = key
    if(parseKey != null ){
      parseKey = key?.charAt(key.length - 1) !== `/` ? `${key}/` : key;
    }

 
    const data = await getFolderAndFiles(parseKey, userId, isPublicDirectory);

    if (data == null) {
      return NextResponse.json(
        {
          message: `Requested ${key} not found`,
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({ data: data });
  } catch (error) {
    console.log("[SUBSCRIPTION] aa", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
