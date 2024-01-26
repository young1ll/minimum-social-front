import { default as authConfig } from "./auth";
import { default as siteConfig } from "./site";

export default {
  rootUrl: process.env.NEXTAUTH_URL!,
  userPort: process.env.NEXT_PUBLIC_USER_PORT!,
  topicPort: process.env.NEXT_PUBLIC_TOPIC_PORT!,

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
