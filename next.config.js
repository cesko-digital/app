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
    ],
  },
};

module.exports = nextConfig;
