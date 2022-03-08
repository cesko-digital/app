import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import { siteData } from "lib/site-data";
import { CeduVideoPage, PageProps } from "components/cedu";

type StaticPageProps = Omit<PageProps, "startTime">;

interface QueryParams extends ParsedUrlQuery {
  slug: string;
}

const Page: NextPage<StaticPageProps> = ({ video }) => {
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

export const getStaticProps: GetStaticProps<
  StaticPageProps,
  QueryParams
> = async (context) => {
  const { slug } = context.params!;
  const video = siteData.videos.find((v) => v.slug === slug)!;
  return {
    props: {
      video,
    },
  };
};

export default Page;
