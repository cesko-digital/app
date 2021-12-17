import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { getAllVideos, PortalVideo } from "lib/cedu";
import { prepareToSerialize } from "lib/utils";
import { ParsedUrlQuery } from "querystring";

interface PageProps {
  video: PortalVideo;
}

interface QueryParams extends ParsedUrlQuery {
  slug: string;
}

const Page: NextPage<PageProps> = ({ video }) => {
  return <pre>{JSON.stringify(video, null, 2)}</pre>;
};

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const videos = await getAllVideos();
  const paths = videos.map((video) => ({
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
  const videos = await getAllVideos();
  const video = videos.find((v) => v.slug === slug)!;
  return {
    props: prepareToSerialize({
      video,
    }),
  };
};

export default Page;
