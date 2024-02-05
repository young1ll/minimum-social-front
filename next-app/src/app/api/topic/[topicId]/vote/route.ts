import config from "@/config";
import { NextRequest, NextResponse } from "next/server";

const topicBaseUrl = `${config.serverUrl}:${config.topicPort}`;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const userId = searchParams.get("userId");
  const topicId = searchParams.get("topicId");

  const params = {
    ...(userId && { userId }),
    ...(topicId && { topicId }),
  };

  const url = new URL(`${topicBaseUrl}/voted`);
  url.search = new URLSearchParams(params).toString();

  const serverResponse = await fetch(url);

  const responseData = await serverResponse.json();

  return NextResponse.json({
    ...responseData.data,
    // data: [],
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const serverResponse = await fetch(`${topicBaseUrl}/voted`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  });

  const responseData = await serverResponse.json();
  // const responseData = { ...res };

  return NextResponse.json(responseData.data);
}
