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
