import config from "@/config";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

/**
 * 서버로부터 사용자정보 가져오기
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const id = searchParams.get("id");
  const username = searchParams.get("username");
  const email = searchParams.get("email");

  const params = {
    ...(id && { id }),
    ...(username && { username }),
    ...(email && { email }),
  };

  const serverResponse = await axios.get(
    `http://localhost:${config.userPort}/user`,
    {
      params,
    },
  );

  const responseData = serverResponse.data;

  return NextResponse.json({
    ...responseData,
  });
}

export async function POST(request: NextRequest) {
  const res = await request.json();

  console.log("res", { ...res });

  const serverResponse = await axios.post(
    `http://localhost:${config.userPort}/user`,
    {
      ...res,
    },
  );

  const responseData = serverResponse.data;

  return NextResponse.json(responseData);
}
