import createFolder from "@/app/vendor/aws/s3/createFolder";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { FileStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4, v4 } from "uuid";
import { createReadStream } from "fs";
import { getS3Client } from "@/app/vendor/aws/s3/getS3Client";
import { Upload } from "@aws-sdk/lib-storage";
import { NextApiResponse } from "next";

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

export async function POST(req: Request, res: NextApiResponse) {
  // POST /api/upload
  try {
    const { userId } = auth();

    if (userId == null) {
      throw new Error("Un Authorized");
    }
    //  const requestBody = await req.json();

    const formData = await req.formData();

    const formFile = formData.get("file");
    const parentKey = formData.get("parentKey")?.toString();

    if (formFile == null) {
      throw new Error(" Invalid file");
    }
    const fileName = formFile.name;

    console.log("here: ", fileName);
    // parentKey null means it will upload in root folder

    // create or  get a folder if not exist

    const parentFolder = await getOrCreateParentFolder(parentKey);

    const fileKey = `${parentFolder.key}${uuidv4()}`;

    // create file
    const file = await db.file.create({
      data: {
        key: fileKey,
        name: fileName,
        userId: userId,
        folderId: parentFolder.id,
      },
    });

    // Upload File here
    const parallelUploads3 = new Upload({
      client: getS3Client(),
      params: {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileKey,
        Body: formFile,
      },
      queueSize: 4, // optional concurrency configuration
      partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
      leavePartsOnError: false, // optional manually handle dropped parts
    });

    await parallelUploads3.done();

    return NextResponse.json({
      data: {
        file: file,
      },
    });
  } catch (error) {
    console.log("[SUBSCRIPTION]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
