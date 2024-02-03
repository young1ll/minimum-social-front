import config from "@/config";
import { NextRequest, NextResponse } from "next/server";

const topicBaseUrl = `${config.serverUrl}:${config.topicPort}`;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const topicId = searchParams.get("topicId");

  const params = {
    ...(topicId && { topicId }),
  };

  const url = new URL(`${topicBaseUrl}/topic`);
  url.search = new URLSearchParams(params).toString();

  const serverResponse = await fetch(url);

  const responseData = await serverResponse.json();

  return NextResponse.json({
    ...responseData.data,
    // data: [],
  });
}
