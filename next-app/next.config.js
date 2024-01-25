/** @type {import('next').NextConfig} */
const nextConfig = {
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
