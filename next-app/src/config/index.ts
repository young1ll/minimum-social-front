import { default as authConfig } from './auth';
import { default as siteConfig } from './site';

export default {
  rootUrl: process.env.NEXT_PUBLIC_BASE_URL || 'localhost:3000',

  apiProtocol: process.env.NEXT_PUBLIC_API_PROTOCOL || 'http://',
  apiHost: process.env.NEXT_PUBLIC_API_HOST || 'localhost:3000/api',

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
