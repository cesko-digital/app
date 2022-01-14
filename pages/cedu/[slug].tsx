import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { PortalVideo } from "lib/cedu";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import { Layout, Section, SectionContent } from "components/layout";
import * as Typography from "components/typography";
import { Route } from "lib/routing";
import RenderMarkdown from "components/markdown";
import { siteData } from "lib/site-data";
import {
  BoxesColumn,
  MainColumn,
  TwoColumnLayout,
  VideoIframe,
  VideoWrapper,
} from "components/cedu/styles";
import {
  CreditsBox,
  ResourceBox,
  TableOfContentBox,
} from "components/cedu/content-box";

interface PageProps {
  video: PortalVideo;
}

interface QueryParams extends ParsedUrlQuery {
  slug: string;
}

const Page: NextPage<PageProps> = ({ video }) => {
  const router = useRouter();
  const { start } = router.query;

  return (
    <Layout
      crumbs={[
        { path: Route.volunteerPortal, label: "Portál dobrovolníka" },
        { label: video.title },
      ]}
      seo={{
        title: video.title,
        description: video.description,
        coverUrl: video.cover,
      }}
    >
      <Section>
        <SectionContent>
          <Typography.Heading1>{video.title}</Typography.Heading1>
        </SectionContent>
      </Section>
      <Section>
        <SectionContent>
          <TwoColumnLayout>
            <MainColumn>
              <VideoWrapper>
                <VideoIframe
                  src={video.videoUrl + "?start=" + start}
                  title={video.title}
                  frameBorder="0"
                  allowFullScreen
                />
              </VideoWrapper>
              <Typography.Body>
                <RenderMarkdown source={video.transcript} />
              </Typography.Body>
            </MainColumn>
            <BoxesColumn>
              <TableOfContentBox segments={video.toc} />
              <ResourceBox resources={video.resources} />
              <CreditsBox credits={video.credits} />
            </BoxesColumn>
          </TwoColumnLayout>
        </SectionContent>
      </Section>
    </Layout>
  );
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
