import config from "@/config";
import { NextRequest, NextResponse } from "next/server";

const topicBaseUrl = `${config.serverUrl}:${config.topicPort}`;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  const params = {
    ...(userId && { userId }),
  };

  const url = new URL(`${topicBaseUrl}/topic-count`);
  url.search = new URLSearchParams(params).toString();

  const serverResponse = await fetch(url);
  const responseData = await serverResponse.json();

  return NextResponse.json({
    ...responseData,
  });
}
