import { PortalVideo } from "lib/cedu";
import { CreditsBox, ResourceBox, TableOfContentBox } from "./content-box";
import { Layout, Section, SectionContent } from "components/layout";
import RenderMarkdown from "components/shared/markdown";
import * as Typography from "components/typography";
import strings from "content/strings.json";
import { Route } from "lib/routing";
import {
  BoxesColumn,
  MainColumn,
  TwoColumnLayout,
  VideoIframe,
  VideoWrapper,
} from "./styles";

export type PageProps = {
  video: PortalVideo;
  startTime?: any;
};

export const CeduVideoPage: React.FC<PageProps> = ({
  video,
  startTime = "",
}) => {
  return (
    <Layout
      crumbs={[
        { path: Route.dashboard, label: strings.crumbs.dashboard },
        { label: video.title },
      ]}
      head={{
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
                  src={video.videoUrl + "?start=" + startTime}
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
