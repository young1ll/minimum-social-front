import config from "@/config";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const res = await request.json();

  console.log("res", { ...res });

  const serverResponse = await axios.post(
    `http://localhost:${config.topicPort}/candidate`,
    {
      ...res,
    },
  );

  const responseData = serverResponse.data;
  // const responseData = { ...res };

  return NextResponse.json(responseData);
}
