import { default as authConfig } from "./auth";
import { default as siteConfig } from "./site";

export default {
  rootUrl: process.env.NEXTAUTH_URL,

  apiProtocol: process.env.NEXT_PUBLIC_API_PROTOCOL,
  apiHost: process.env.NEXT_PUBLIC_API_HOST,

  site: {
    ...siteConfig,
  },

  auth: {
    ...authConfig,
  },
};

export { authConfig, siteConfig };

export type SiteConfig = typeof siteConfig;
export type AuthConfig = typeof authConfig;
