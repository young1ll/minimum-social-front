import config from "@/config";
import { NextRequest, NextResponse } from "next/server";

const topicBaseUrl = `${config.serverUrl}:${config.topicPort}`;

export async function POST(request: NextRequest) {
  const body = await request.json();

  const serverResponse = await fetch(`${topicBaseUrl}/candidate`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  });

  const responseData = await serverResponse.json();

  return NextResponse.json({
    // body,
    ...responseData,
  });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();

  const serverResponse = await fetch(`${topicBaseUrl}/candidate`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(body),
  });

  const responseData = await serverResponse.json();

  return NextResponse.json({
    // body,
    ...responseData,
  });
}
