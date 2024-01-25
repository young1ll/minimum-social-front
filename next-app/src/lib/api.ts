import config from "@/config";
import axios, { AxiosRequestHeaders } from "axios";
import { getSession } from "next-auth/react";

/**
 * Auth Server API Instance #1
 */
export const axiosClient = axios.create({
  // config.apiProtocol+config.apiHost
  // backend server
  baseURL: config.apiProtocol! + config.apiHost,
  timeout: 10000,
  timeoutErrorMessage: "Request Timeout",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * User Server와 통신할 때 Axios Interceptor를 사용해 Header에 token 주입
 */
export const axiosClientValidReq = axiosClient.interceptors.request.use(
  async (request) => {
    const session = await getSession();

    if (session) {
      request.headers = {
        ...request.headers,
        Authorization: `Bearer ${session}`,
      } as AxiosRequestHeaders;
    }

    return request;
  },
);
