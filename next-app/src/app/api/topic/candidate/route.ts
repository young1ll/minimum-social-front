import config from "@/config";
import { NextRequest, NextResponse } from "next/server";

const topicBaseUrl = `${config.serverUrl}:${config.topicPort}`;

export async function POST(request: NextRequest) {
  const res = await request.json();

  console.log("res", { ...res });

  const serverResponse = await fetch(`${topicBaseUrl}/candidate`, {
    method: "POST",
    body: { ...res },
  });

  const responseData = await serverResponse.json();
  // const responseData = { ...res };

  return NextResponse.json(responseData.data);
}
