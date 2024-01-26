import axios, { AxiosRequestHeaders } from "axios";
import { getSession } from "next-auth/react";

export const axiosClient = axios.create({
  baseURL: "/api",
  timeout: 10000,
  timeoutErrorMessage: "Request Timeout",
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosValidRequest = axiosClient.interceptors.request.use(
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
