import config from "@/config";
import { NextRequest, NextResponse } from "next/server";

const topicBaseUrl = `${config.serverUrl}:${config.topicPort}`;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const userId = searchParams.get("userId");
  const order = searchParams.get("order");
  const page = searchParams.get("page");

  const params = {
    ...(userId && { userId }),
    ...(order && { order }),
    ...(page && { page }),
  };

  const url = new URL(`${topicBaseUrl}/topics`);
  url.search = new URLSearchParams(params).toString();

  const serverResponse = await fetch(url);

  const responseData = await serverResponse.json();

  return NextResponse.json({
    ...responseData,
    // data: [],
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const serverResponse = await fetch(`${topicBaseUrl}/topic`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  });

  const responseData = await serverResponse.json();

  return NextResponse.json({
    // ...body,
    ...responseData,
  });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();

  const serverResponse = await fetch(`${topicBaseUrl}/topic`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(body),
  });

  const responseData = await serverResponse.json();

  return NextResponse.json({
    // ...body,
    ...responseData,
  });
}
