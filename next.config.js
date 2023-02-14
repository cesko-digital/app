/** @type {import('next').NextConfig} */

// This extends our Next config with stuff needed to integrate with Axiom:
// https://www.axiom.co/docs/integrations/vercel#web-vitals
const { withAxiom } = require("next-axiom");

module.exports = withAxiom({
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

  // We prefer to set up redirects here and not in `vercel.json`
  // so that the framework knows about them and they also work in environments
  // like `yarn dev`.
  async redirects() {
    return [
      //
      // Redirect automatic scans to keep them from spamming our logs
      //
      {
        source: "/(.*).php",
        destination:
          "https://www.google.com/search?q=how+can+i+benefit+to+the+society",
        permanent: false,
      },
      {
        source: "/wp-(.*)",
        destination:
          "https://www.google.com/search?q=how+can+i+benefit+to+the+society",
        permanent: false,
      },
      //
      // URL shortcuts
      //
      {
        source: "/go/spolu",
        destination: "http://data.cesko.digital/spolunadalku/prirucka.pdf",
        permanent: false,
      },
      {
        source: "/go/privacy",
        destination:
          "https://docs.google.com/document/d/e/2PACX-1vQ3cVnhGyzIsyDx0gyx3uPJharkhhfQOXHcgCI3swVZaDd0sXhmX74E1IVEtItWvA2H_dQqGTkxeR2q/pub",
        permanent: false,
      },
      {
        source: "/go/gdpr",
        destination:
          "https://docs.google.com/document/d/1Fnh-Te5IAjloSg5YkQxFhVNPz6eGuPLY/edit?usp=sharing&ouid=108890724728869976226&rtpof=true&sd=true",
        permanent: false,
      },
      {
        source: "/go/newsletter-privacy",
        destination:
          "https://docs.google.com/document/u/1/d/e/2PACX-1vRJ2psHJKCYvSbWhwT5eKneqaG2jGpxNYgG1ouXAVNQrHuVaLGbyDMkOd3VqIYqUGR4UoLojwlCjJil/pub",
        permanent: false,
      },
      {
        source: "/go/newsletters",
        destination:
          "https://ceskodigital.ecomailapp.cz/public/form/5-ed07fd6b07ff0199fabc8509f995f058",
        permanent: false,
      },
      //
      // “Naked” URL shortcuts
      //
      {
        source: "/merch",
        destination: "/support",
        permanent: false,
      },
      {
        source: "/prirucka",
        destination: "https://github.com/cesko-digital/derisking-handbook",
        permanent: false,
      },
      {
        source: "/links",
        destination: "https://linktr.ee/ceskodigital",
        permanent: false,
      },
      {
        source: "/impact22",
        destination:
          "https://drive.google.com/file/d/1uwqL3xsfaSbje-dPK8wyfAAKFrWL_dc2/view",
        permanent: false,
      },
      //
      // Older URLs we would like to support as a courtesy
      //
      {
        source: "/events/meetup-ceskodigital-1",
        destination: "/events/meetup-ceskodigital-3",
        permanent: true,
      },  
      {
        source: "/events/hack-day-1",
        destination: "/events/hack-day-2",
        permanent: true,
      },
      {
        source: "/portal-dobrovolnika",
        destination: "/dashboard",
        permanent: true,
      },
      {
        source: "/cedu/devtalk-1-infrastruktura",
        destination: "https://www.youtube.com/watch?v=5IlYHMlIZCc",
        permanent: true,
      },
      {
        source: "/assets/fb-sharing-banner.png",
        destination: "https://data.cesko.digital/web/metadata-cover.png",
        permanent: true,
      },
    ];
  },
});
