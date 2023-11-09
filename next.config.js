/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "data.cesko.digital",
      },
      {
        protocol: "https",
        hostname: "diskutuj.digital",
      },
      {
        protocol: "https",
        hostname: "avatars.slack-edge.com",
      },
    ],
  },
};

module.exports = nextConfig;
