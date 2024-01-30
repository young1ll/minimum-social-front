import config from "@/config";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const topicId = searchParams.get("topicId");

  const params = {
    ...(topicId && { topicId }),
  };

  const serverResponse = await axios.get(
    `http://localhost:${config.topicPort}/topic`,
    { params },
  );

  const responseData = serverResponse.data;

  return NextResponse.json({
    ...responseData,
    // data: [],
  });
}
