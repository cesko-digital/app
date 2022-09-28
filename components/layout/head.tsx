import Head from "next/head";
import strings from "content/strings.json";

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
      <meta property="og:image" content={coverUrl}/>
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:image" content={coverUrl}/>
      <link rel="shortcut icon" type="image/png" href="/favicon.png"/>
      <link rel="alternate" hrefLang="cs" href="https://cesko.digital"/>
      <link rel="alternate" hrefLang="en" href="https://en.cesko.digital"/>
    </Head>
  );
};

export default CustomHead;
