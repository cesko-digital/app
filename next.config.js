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
        hostname: "ca.slack-edge.com",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
      {
        protocol: "https",
        hostname: "mogrfyhmal8klgqy.public.blob.vercel-storage.com",
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
