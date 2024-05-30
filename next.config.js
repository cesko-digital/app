/** @type {import('next').NextConfig} */

// This extends our Next config with stuff needed to integrate with Axiom:
// https://www.axiom.co/docs/integrations/vercel#web-vitals
const { withAxiom } = require("next-axiom");

module.exports = withAxiom({
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    serverMinification: false,
  },
  images: {
    remotePatterns: [
      {
        hostname: "data.cesko.digital",
      },
      {
        protocol: "https",
        hostname: "diskutuj.digital",
      },
      {
        protocol: "https",
        hostname: "assets.cesko.digital",
      },
      {
        protocol: "https",
        hostname: "avatars.slack-edge.com",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/market-place",
        destination: "https://diskutuj.digital/c/trziste/5",
        permanent: true,
      },
    ];
  },
});
