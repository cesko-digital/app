import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { PortalVideo } from "lib/cedu";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import { siteData } from "lib/site-data";
import CeduVideoPage from "components/cedu";

interface PageProps {
  video: PortalVideo;
}

interface QueryParams extends ParsedUrlQuery {
  slug: string;
}

const Page: NextPage<PageProps> = ({ video }) => {
  const router = useRouter();
  const { start } = router.query;
  return <CeduVideoPage video={video} startTime={start} />;
};

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const paths = siteData.videos.map((video) => ({
    params: { slug: video.slug },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps, QueryParams> = async (
  context
) => {
  const { slug } = context.params!;
  const video = siteData.videos.find((v) => v.slug === slug)!;
  return {
    props: {
      video,
    },
  };
};

export default Page;
