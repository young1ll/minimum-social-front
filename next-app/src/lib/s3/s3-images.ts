import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const bucketName = process.env.S3_BUCKET_NAME!;

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_AWS_ACCESS_KEY!,
    secretAccessKey: process.env.S3_AWS_SECRET_KEY!,
  },
  region: process.env.S3_BUCKET_REGION!,
});

export const getSignedFileUrl = async (data: {
  name: string;
  type: string;
}) => {
  const params = {
    Bucket: bucketName,
    Key: data.name,
  };
  const command = new PutObjectCommand(params);
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

  return url;
};

export const uploadFile = async ({
  fileBuffer,
  filename,
  mimeType,
}: {
  fileBuffer: Buffer;
  filename: string;
  mimeType: string;
}) => {
  const uploadParams = {
    Bucket: bucketName,
    Key: filename,
    Body: fileBuffer,
    ContentType: mimeType,
  };

  const res = await s3.send(new PutObjectCommand(uploadParams));
  return res.$metadata.httpStatusCode;
};
