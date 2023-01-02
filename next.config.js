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
    ];
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true,
      layers: true,
    };
    return config;
  },
};
