/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dfstudio-d420.kxcdn.com",
        port: "",
        pathname: "/wordpress/wp-content/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
