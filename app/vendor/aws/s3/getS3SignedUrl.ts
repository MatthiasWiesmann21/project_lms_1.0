import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Duration } from 'luxon'

import { getS3Client } from './getS3Client'

export default async function getS3SignedUrl({
  operation,
  bucket,
  fileKey,
  duration,
}: {
  operation: 'get' | 'put'
  bucket: string
  fileKey: string
  duration: Duration
}) {
  const client = getS3Client()

  if (operation === 'get') {
    return getSignedUrl(
      client,
      new GetObjectCommand({
        Bucket: bucket,
        Key: fileKey,
      }),
      {
        expiresIn: duration.as('seconds'),
      },
    )
  }

  return getSignedUrl(
    client,
    new PutObjectCommand({
      Bucket: bucket,
      Key: fileKey,
    }),
    {
      expiresIn: duration.as('seconds'),
    },
  )
}
