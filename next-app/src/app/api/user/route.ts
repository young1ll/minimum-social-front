import config from "@/config";
import { NextRequest, NextResponse } from "next/server";

/**
 * 서버로부터 사용자정보 가져오기
 */

const userBaseUrl = `${config.serverUrl}:${config.userPort}`;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const id = searchParams.get("id");
  const username = searchParams.get("username");
  const email = searchParams.get("email");
  const type = searchParams.get("type");

  const params = {
    ...(id && { id }),
    ...(username && { username }),
    ...(email && { email }),
    ...(type && { type }),
  };

  const url = new URL(`${userBaseUrl}/user`);
  url.search = new URLSearchParams(params).toString();

  const serverResponse = await fetch(url);

  const responseData = await serverResponse.json();

  return NextResponse.json({
    ...responseData.data,
  });
}

export async function POST(request: NextRequest) {
  const res = await request.json();

  console.log("res", { ...res });

  const serverResponse = await fetch(`${userBaseUrl}/user`, {
    method: "POST",
    body: { ...res },
  });

  const responseData = await serverResponse.json();

  return NextResponse.json(responseData.data);
}
