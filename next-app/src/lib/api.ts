import axios, { AxiosRequestHeaders } from 'axios';
import { getSession } from 'next-auth/react';

/**
 * Auth Server API Instance #1
 */
export const axios_user = axios.create({
  // config.apiProtocol+config.apiHost
  // backend server
  baseURL: 'http://localhost:3000/api/user',
  timeout: 10000,
  timeoutErrorMessage: 'Request Timeout',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axios_user_auth = axios_user.interceptors.request.use(
  async (request) => {
    const session = await getSession();

    if (session) {
      request.headers = {
        ...request.headers,
        Authorization: `Bearer ${session}`,
      } as AxiosRequestHeaders;
    }

    return request;
  }
);
