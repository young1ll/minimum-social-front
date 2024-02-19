import config from "@/config";
import { getSignedFileUrl } from "@/lib/s3/s3-images";
import { NextRequest, NextResponse } from "next/server";

const userBaseUrl = `${config.serverUrl}:${config.userPort}`;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, type } = body;

  const fileParams = {
    name,
    type,
  };

  const signedUrl = await getSignedFileUrl(fileParams);
  console.log(signedUrl);

  return NextResponse.json({ url: signedUrl });
}
