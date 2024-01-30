import config from "@/config";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

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

  const serverResponse = await axios.get(
    `http://localhost:${config.topicPort}/topics`,
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
    `http://localhost:${config.topicPort}/topic`,
    {
      ...res,
    },
  );

  const responseData = serverResponse.data;
  // const responseData = { ...res };

  return NextResponse.json(responseData);
}
