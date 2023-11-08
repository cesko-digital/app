/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "data.cesko.digital",
      },
    ],
  },
};

module.exports = nextConfig;
