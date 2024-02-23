import createFolder from "@/app/vendor/aws/s3/createFolder";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { useIsOwner } from "@/lib/owner";

const getOrCreateParentFolder = async (userId: string, parentKey?: string) => {
  if (parentKey != null) {
    const parentFolder = await db.folder.findFirst({
      where: {
        key: parentKey,
        userId: userId,
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
      userId: userId,
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
        isPublic: true,
        userId: userId,
      },
    });
  }

  return rootFolder;
};

async function getFolderAndFiles(
  key: string | null,
  userId: string | null,
  isPublicDirectory?: boolean
) {
  let folder;

  if (userId == null) {
    throw new Error("Login first to access");
  }

  // console.log("============");

  if (useIsOwner(userId)) {
    if (key == null) {
      console.log("key", { key, userId });
      folder = await db.folder.findFirst({
        where: {
          parentFolderId: null,
          userId: userId,
        },
        include: {
          subFolders: {
            where: {
              OR: [{ isPublic: true }, { userId: userId }],
            },
          },
          files: {
            where: {
              OR: [{ isPublic: true }, { userId: userId }],
            },
          },
        },
      });
    }
    if (key != null) {
      folder = await db.folder.findFirst({
        where: { key: key },
        include: {
          subFolders: {
            where: {
              OR: [{ isPublic: true }, { userId: userId }],
            },
          },
          files: {
            where: {
              OR: [{ isPublic: true }, { userId: userId }],
            },
          },
        },
      });
    }

    // if (key != null && isPublicDirectory) {
    //   folder = await db.folder.findFirst({
    //     where: { key: key },
    //     include: {
    //       subFolders: {
    //         where: { isPublic: true },
    //       },
    //       files: {
    //         where: { isPublic: true },
    //       },
    //     },
    //   });
    // }
  } else {
    if (key == null) {
      folder = await db.folder.findFirst({
        where: { parentFolderId: null },
        include: {
          subFolders: {
            where: {
              OR: [{ isPublic: true }, { userId: userId }],
            },
          },
          files: {
            where: {
              OR: [{ isPublic: true }, { userId: userId }],
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
            where: { isPublic: true },
          },
        },
      });
    }

    if (key != null && isPublicDirectory) {
      folder = await db.folder.findFirst({
        where: { key: key },
        include: {
          subFolders: {
            where: { isPublic: true },
          },
          files: {
            where: { isPublic: true },
          },
        },
      });
    }
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

    const id = req.nextUrl.searchParams.get("key");
    const isPublicDirectory = req.nextUrl.searchParams.get("isPublicDirectory");

    let key = null;
    if (id) {
      const keyData = await db.folder.findFirst({
        select: {
          key: true,
        },
        where: { id: id },
      });
      //@ts-ignore
      key = keyData?.key;
    }

    if (userId == null) {
      throw new Error("Un Authorized");
    }

    if (useIsOwner(userId)) {
      await getOrCreateParentFolder(userId);
    }

    let parseKey = key || null;
    if (parseKey != null) {
      parseKey = key?.charAt(key.length - 1) !== `/` ? `${key}/` : key;
    }

    const data = await getFolderAndFiles(parseKey, userId, isPublicDirectory);

    if (data == null) {
      return NextResponse.json(
        {
          message: `Requested resource not found`,
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({ data: data });
  } catch (error) {
    console.log("[SUBSCRIPTION]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
 

