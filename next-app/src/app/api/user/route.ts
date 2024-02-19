import config from "@/config";
import { NextRequest, NextResponse } from "next/server";

/**
 * 서버로부터 사용자정보 가져오기
 */

const userBaseUrl = `${config.serverUrl}:${config.userPort}`;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  console.log({ userBaseUrl });

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

  const url = new URL(`${userBaseUrl}/users`);
  url.search = new URLSearchParams(params).toString();

  const serverResponse = await fetch(url);

  const responseData = await serverResponse.json();

  return NextResponse.json({
    // ...params,
    ...responseData.data,
  });
}

// 새로운 사용자 생성
export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log({ userBaseUrl });
  console.log(JSON.stringify(body));

  const serverResponse = await fetch(`${userBaseUrl}/user`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  });

  const responseData = await serverResponse.json();

  return NextResponse.json(responseData.data);
}

//TODO: 토큰 인증
export async function PUT(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  const body = await request.json();

  const url = new URL(`${userBaseUrl}/user/${id}`);
  const serverResponse = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(body),
  });
  const responseData = await serverResponse.json();

  return NextResponse.json({
    ...responseData,
  });
}
