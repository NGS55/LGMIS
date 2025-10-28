import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY ? {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  } : undefined
});

export async function uploadToS3(key: string, body: Buffer | Uint8Array | string, contentType?: string) {
  const Bucket = process.env.AWS_S3_BUCKET!;
  const cmd = new PutObjectCommand({ Bucket, Key: key, Body: body, ContentType: contentType });
  await s3.send(cmd);
  return `https://${Bucket}.s3.amazonaws.com/${key}`;
}
