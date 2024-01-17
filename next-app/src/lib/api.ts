import axios, { AxiosRequestHeaders } from "axios";
import { getSession } from "next-auth/react";

/**
 * Auth Server API Instance #1
 */
export const axios_user = axios.create({
  // config.apiProtocol+config.apiHost
  // backend server
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  timeoutErrorMessage: "Request Timeout",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * User Server와 통신할 때 Axios Interceptor를 사용해 Header에 token 주입
 */
export const axios_user_valid_post = axios_user.interceptors.request.use(async (request) => {
  const session = await getSession();

  if (session) {
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${session}`,
    } as AxiosRequestHeaders;
  }

  return request;
});
