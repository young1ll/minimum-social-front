import config from "@/config";
import { NextRequest, NextResponse } from "next/server";

const topicBaseUrl = `${config.serverUrl}:${config.topicPort}`;

export async function GET(
  request: NextRequest,
  { params }: { params: { topicId: string } },
) {
  const topicId = params.topicId;

  const url = new URL(`${topicBaseUrl}/topic`);
  url.search = new URLSearchParams({ topicId }).toString();

  console.log({ url });

  const serverResponse = await fetch(url);
  const responseData = await serverResponse.json();

  return NextResponse.json({
    // params,
    // url,
    // topicId,
    ...responseData,
  });
}
