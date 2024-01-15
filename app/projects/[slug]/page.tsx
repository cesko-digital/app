import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "~/components/Breadcrumbs";
import { Card } from "~/components/Card";
import { EventCard } from "~/components/EventCard";
import Icons from "~/components/icons";
import { ImageLabel } from "~/components/ImageLabel";
import { MarkdownContent } from "~/components/MarkdownContent";
import { OpportunityRow } from "~/components/OpportunityRow";
import { ProjectCard } from "~/components/ProjectCard";
import { RelatedContent } from "~/components/RelatedContent";
import { Sidebar, SidebarCTA, SidebarSection } from "~/components/Sidebar";
import LiteYouTubeEmbed from "~/components/YouTubeEmbed";
import { getBlogIndex } from "~/src/data/blog";
import { getOpportunitiesForProject } from "~/src/data/opportunity";
import { getAllProjects, type Project } from "~/src/data/project";
import { getFeaturedEventsForProject } from "~/src/data/queries";
import {
  getPublicTeamEngagementsForProject,
  type TeamEngagement,
} from "~/src/data/team-engagement";
import { getAllPlaylistVideos } from "~/src/data/youtube";
import { Route } from "~/src/routing";
import { shuffleInPlace } from "~/src/utils";

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

import { type Metadata } from "next";

import clsx from "clsx";

type Params = {
  slug: string;
};

export type Props = {
  params: Params;
};

/** Project detail page */
async function Page({ params }: Props) {
  const allProjects = await getAllProjects();
  const project = allProjects.find((p) => p.slug === params.slug);
  if (!project) {
    notFound();
  }

  const otherProjects = shuffleInPlace(
    allProjects
      .filter((p) => p.slug !== params.slug)
      .filter((p) => p.state === "running" || p.state === "incubating"),
  ).slice(0, 3);

  const opportunities = (await getOpportunitiesForProject(project.slug)).filter(
    (o) => o.status === "live",
  );

  const events = await getFeaturedEventsForProject(project);

  const allTeamEngagements = await getPublicTeamEngagementsForProject(
    project.slug,
  );
  const coordinators = allTeamEngagements
    // Only take coordinators
    .filter((e) => e.coordinatingRole)
    // Sort inactive engagements last
    .sort((a, b) => {
      if (a.inactive && !b.inactive) {
        return +1;
      } else if (b.inactive && !a.inactive) {
        return -1;
      } else {
        return 0;
      }
    });

  const blogIndex = await getBlogIndex();
  const relatedBlogPosts = blogIndex.filter((post) =>
    post.tags.some((t) => t === project.slug),
  );

  const relatedVideos = project.youTubePlaylistId
    ? await getAllPlaylistVideos(project.youTubePlaylistId)
    : [];

  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs
        path={[
          { label: "Homepage", path: "/" },
          { label: "Projekty", path: Route.projects },
        ]}
        currentPage={project.name}
      />

      <h1 className="typo-title mb-2 mt-7">{project.name}</h1>
      <h2 className="typo-subtitle mb-10 max-w-prose">
        {stripTrailingComma(project.tagline)}
      </h2>
      <div className="relative mb-10 aspect-[2.3]">
        <Image
          src={project.coverImageUrl}
          className="bg-gray object-cover"
          alt=""
          fill
        />
      </div>

      <div className="flex flex-col gap-20">
        {/* Main project info */}
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <h2 className="typo-title2">O projektu</h2>
            <MarkdownContent source={project.description.source} />
          </section>
          <aside>
            <ProjectSidebar project={project} coordinators={coordinators} />
          </aside>
        </div>

        {/* Project team */}
        {project.featureFlags.includes("displayProjectTeam") && (
          <ProjectTeamSection team={allTeamEngagements} />
        )}

        {/* Related blog posts */}
        {relatedBlogPosts.length > 0 && (
          <RelatedContent
            label="Vybíráme z našeho blogu"
            seeAllLabel="Blog Česko.Digital"
            seeAllUrl={Route.blog}
          >
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {relatedBlogPosts.slice(0, 3).map((post) => (
                <Card
                  key={post.url}
                  coverImageUrl={post.cover}
                  linkUrl={post.url}
                >
                  <div className="p-7">
                    <h3 className="typo-title3 mb-3">{post.title}</h3>
                    <p className="line-clamp-4">{post.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </RelatedContent>
        )}

        {/* Related events */}
        {events.length > 0 && (
          <RelatedContent
            label="Vybrané akce"
            seeAllLabel="Všechny akce"
            seeAllUrl={Route.events}
          >
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {events.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </RelatedContent>
        )}

        {/* Related open roles */}
        {opportunities.length > 0 && (
          <RelatedContent
            label="Právě hledáme"
            seeAllLabel="Všechny hledané role"
            seeAllUrl={Route.opportunities}
          >
            <div>
              {opportunities.map((o) => (
                <OpportunityRow key={o.id} role={o} />
              ))}
            </div>
          </RelatedContent>
        )}

        {/* Related videos */}
        {relatedVideos.length > 0 && (
          <RelatedContent
            label="Vybraná videa"
            seeAllLabel="Všechna videa"
            seeAllUrl={Route.toYouTubePlaylist(project.youTubePlaylistId!)}
          >
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {relatedVideos.slice(0, 6).map((video) => (
                <LiteYouTubeEmbed
                  key={video.id}
                  id={video.snippet.resourceId.videoId}
                  title={video.snippet.title}
                  poster="hqdefault"
                  noCookie={true}
                />
              ))}
            </div>
          </RelatedContent>
        )}

        {/* Other projects */}
        <RelatedContent
          label="Další projekty"
          seeAllLabel="Všechny projekty"
          seeAllUrl={Route.projects}
        >
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </RelatedContent>
      </div>
    </main>
  );
}

//
// Project Team
//

const ProjectTeamSection = ({ team }: { team: TeamEngagement[] }) => (
  <section>
    <h2 className="typo-title2 mb-7">Tým</h2>
    <div className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {team.map((e) => (
        <EngagementCard key={e.id} engagement={e} />
      ))}
    </div>
  </section>
);

const EngagementCard = ({ engagement }: { engagement: TeamEngagement }) => (
  <div className="flex gap-4 rounded-lg bg-pebble p-4 pt-7 sm:flex-col sm:gap-2 sm:text-center">
    <Image
      src={engagement.userAvatarUrl}
      className={clsx(
        "rounded-full bg-gray shadow",
        // This fixes the appearance of non-square images
        "aspect-square object-cover object-top",
        "sm:mx-auto",
      )}
      alt=""
      width={80}
      height={80}
    />
    <div className="self-center">
      <h3 className="typo-subtitle">{engagement.userName}</h3>
      <p>{engagement.projectRole}</p>
    </div>
  </div>
);

//
// Sidebar
//

const ProjectSidebar = ({
  project,
  coordinators,
}: {
  project: Project;
  coordinators: TeamEngagement[];
}) => {
  // If we have some active coordinators, display just those; otherwise display all
  const activeCoordinators = coordinators.filter((c) => !c.inactive);
  const displayedCoordinators =
    activeCoordinators.length > 0 ? activeCoordinators : coordinators;

  const links = project.links || [];
  const featuredLink = links.find((link) => link.featured);
  const ordinaryLinks = links.filter((link) => link !== featuredLink);

  const CoordinatorList = () => (
    <div className="flex flex-col gap-3">
      {displayedCoordinators.map((c) => (
        <ImageLabel
          key={c.id}
          imageUrl={c.userAvatarUrl}
          label={c.userName}
          faded={c.inactive}
        />
      ))}
    </div>
  );

  const LinkList = () => (
    <ul className="flex flex-col gap-4">
      {ordinaryLinks.map((link) => (
        <li key={link.url} className="item-center flex flex-row gap-3">
          <div className="w-[20px] shrink-0 grow-0 pt-1">
            <LinkIcon url={link.url} />
          </div>
          <Link href={link.url} className="underline">
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <Sidebar>
      {coordinators.length > 0 && (
        <SidebarSection title="Koordinace projektu">
          <CoordinatorList />
        </SidebarSection>
      )}
      {ordinaryLinks.length > 0 && (
        <SidebarSection title="Odkazy">
          <LinkList />
        </SidebarSection>
      )}
      {featuredLink && (
        <SidebarCTA href={featuredLink.url} label={featuredLink.name} />
      )}
    </Sidebar>
  );
};

const LinkIcon = ({ url }: { url: string }) => {
  const ICONS_BY_PAGES = {
    "cesko-digital.slack.com": Icons.Slack,
    "app.slack.com": Icons.Slack,
    "github.com": Icons.GitHub,
    "cesko-digital.atlassian.net/jira": Icons.Jira,
    "trello.com": Icons.Trello,
    "cesko-digital.atlassian.net": Icons.Confluence,
    "miro.com": Icons.Miro,
    "youtube.com": Icons.YouTube,
    "app.asana.com": Icons.Asana,
    "calendar.google.com": Icons.GoogleCalendar,
    "docs.google.com": Icons.GoogleDocs,
    "drive.google.com": Icons.GoogleDrive,
    "figma.com": Icons.Figma,
    "airtable.com": Icons.Airtable,
  };

  const hostname = getHostname(url);
  for (const [page, Icon] of Object.entries(ICONS_BY_PAGES)) {
    if (hostname.startsWith(page)) {
      return <Icon />;
    }
  }

  return <Icons.GenericWebsite />;
};

//
// Metadata
//

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const allProjects = await getAllProjects();
  const project = allProjects.find((p) => p.slug === params.slug);
  if (!project) {
    return {};
  }
  return {
    title: `${project.name} | Česko.Digital`,
    description: project.tagline,
    openGraph: { images: project.coverImageUrl },
  };
}

//
// Helpers
//

/**
 * Returns a hostname of the provided URL without the "www." prefix.
 */
const getHostname = (url: string): string => {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
};

const stripTrailingComma = (s: string) => s.replace(/\.?\s*$/, "");

export default Page;
