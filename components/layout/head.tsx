/* eslint-disable @next/next/no-css-tags */
import Head from "next/head";
import strings from "content/strings.json";
import { env } from "lib/env";

export interface CustomHeadProps {
  description?: string;
  title?: string;
  coverUrl?: string;
}

export const CustomHead: React.FC<CustomHeadProps> = ({
  description,
  title,
  coverUrl = "https://data.cesko.digital/web/metadata-cover.png",
}: CustomHeadProps) => {
  return (
    <Head>
      <title>
        {title ? `${title} | Česko.Digital` : strings.metadata.title}
      </title>
      <meta
        name="viewport"
        content="width=device-width, minimum-scale=1, initial-scale=1, viewport-fit=cover"
      />
      <meta
        name="description"
        content={description || strings.metadata.description}
      />
      {env.allowAnalytics && (
        <script
          defer
          data-domain="cesko.digital"
          src="https://plausible.io/js/plausible.js"
        ></script>
      )}
      <meta property="og:image" content={coverUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={coverUrl} />
      {!env.allowRobots && <meta name="robots" content="noindex, nofollow" />}
      <link rel="stylesheet" href="/fonts.css" />
      <link rel="stylesheet" href="/global.css" />
      <link rel="shortcut icon" type="image/png" href="/favicon.png" />
    </Head>
  );
};

export default CustomHead;
