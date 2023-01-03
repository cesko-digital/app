/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      // Redirect automatic .php scans to keep them from spamming our logs
      {
        source: "/(.*).php",
        destination:
          "https://www.google.com/search?q=how+can+i+benefit+to+the+society",
        permanent: false,
      },
      // Redirect automatic WordPress scans to keep them from spamming our logs
      {
        source: "/wp-(.*)",
        destination:
          "https://www.google.com/search?q=how+can+i+benefit+to+the+society",
        permanent: false,
      },
      // This is an old og:image that some clients keep requesting for some strange reason
      {
        source: "/assets/fb-sharing-banner.png",
        destination: "https://data.cesko.digital/web/metadata-cover.png",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    // Only warn about data size if payload is over 256 KB.
    // TBD: Decrease this limit back to 128 KB and try to shave off
    // the extra data or move to React Server Components to make
    // the offending pages lighter.
    largePageDataBytes: 256 * 100000,
  },
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true,
      layers: true,
    };
    return config;
  },
};
