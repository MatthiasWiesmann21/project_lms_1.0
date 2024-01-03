import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Duration } from "luxon";

import { getS3Client } from "./getS3Client";

export default async function getS3SignedUrl({
  fileKey,
  duration,
}: {
  fileKey: string;
  duration: Duration;
}) {
  const client = getS3Client();

  return getSignedUrl(
    client,
    new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,
    }),
    {
      expiresIn: duration.as("seconds"),
    }
  );
}
