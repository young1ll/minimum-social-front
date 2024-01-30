import config from "@/config";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const userId = searchParams.get("userId");
  const topicId = searchParams.get("topicId");

  const params = {
    ...(userId && { userId }),
    ...(topicId && { topicId }),
  };

  const serverResponse = await axios.get(
    `http://localhost:${config.topicPort}/voted`,
    { params },
  );

  const responseData = serverResponse.data;

  return NextResponse.json({
    ...responseData,
    // data: [],
  });
}

export async function POST(request: NextRequest) {
  const res = await request.json();

  console.log("res", { ...res });

  const serverResponse = await axios.post(
    `http://localhost:${config.topicPort}/voted`,
    {
      ...res,
    },
  );

  const responseData = serverResponse.data;
  // const responseData = { ...res };

  return NextResponse.json(responseData);
}
