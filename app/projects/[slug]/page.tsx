import Markdoc from "@markdoc/markdoc";
import { Breadcrumbs } from "components/Breadcrumbs";
import { allCustomTags } from "components/MarkdocTags";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import Icons from "components/icons";
import { Project, findProjectBySlug } from "src/data/project";
import { clsx } from "clsx";
import {
  TeamEngagement,
  getTeamEngagementsForProject,
} from "src/data/team-engagement";
import { projectDescriptionConfig } from "src/markdoc/schema";
import { Route } from "src/routing";
import Link from "next/link";

type Params = {
  slug: string;
};

export type Props = {
  params: Params;
};

async function Page({ params }: Props) {
  const project = await findProjectBySlug(params.slug);
  if (!project) {
    notFound();
  }

  const allTeamEngagements = await getTeamEngagementsForProject(project.slug);
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

  return (
    <main className="py-20 px-7 max-w-content m-auto">
      <Breadcrumbs
        path={[
          { label: "Homepage", path: "/" },
          { label: "Projekty", path: Route.projects },
        ]}
        currentPage={project.name}
      />

      <h1 className="typo-title mt-7 mb-2">{project.name}</h1>
      <h2 className="typo-subtitle mb-10">{project.tagline}</h2>
      <div className="aspect-[2.3] relative mb-10">
        <Image
          src={project.coverImageUrl}
          className="object-cover"
          alt=""
          fill
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        <section className="lg:col-span-2">
          <h2 className="typo-title2">O projektu</h2>
          <ProjectDescription project={project} />
        </section>
        <aside>
          <Sidebar project={project} coordinators={coordinators} />
        </aside>
      </div>
    </main>
  );
}

const ProjectDescription = ({ project }: { project: Project }) => {
  const syntaxTree = Markdoc.parse(project.description.source);
  const renderableNode = Markdoc.transform(
    syntaxTree,
    projectDescriptionConfig
  );
  const renderedContent = Markdoc.renderers.react(renderableNode, React, {
    components: allCustomTags,
  });
  return <div className="embedded-markdown max-w-prose">{renderedContent}</div>;
};

const Sidebar = ({
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

  const CoordinatorList = () => (
    <div>
      <h2 className="typo-title3 mb-4">Koordinace projektu</h2>
      {displayedCoordinators.map((c) => (
        <div
          key={c.id}
          className={clsx(
            "flex flex-row gap-4 items-center mb-2",
            c.inactive && "opacity-50"
          )}
        >
          {/* TBD: Fix non-square avatars, https://app.cesko.digital/projects/digitalni-inkluze */}
          <Image
            src={c.userAvatarUrl}
            className="rounded-full"
            width={60}
            height={60}
            alt=""
          />
          <span>{c.userName}</span>
        </div>
      ))}
    </div>
  );

  const links = project.links || [];
  const featuredLink = links.find((link) => link.featured);
  const ordinaryLinks = links.filter((link) => link !== featuredLink);

  const LinkList = () => (
    <div>
      <h2 className="typo-title3 mb-4">Odkazy</h2>
      <ul className="flex flex-col gap-4">
        {ordinaryLinks.map((link) => (
          <li key={link.url} className="flex flex-row item-center gap-2">
            <LinkIcon url={link.url} />
            <Link href={link.url} className="underline">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="bg-pebble rounded-xl p-7 flex flex-col gap-7">
      {coordinators.length > 0 && <CoordinatorList />}
      {ordinaryLinks.length > 0 && <LinkList />}
      {featuredLink && (
        <div>
          <Link
            className="block btn-primary text-center"
            href={featuredLink.url}
          >
            {featuredLink.name}
          </Link>
        </div>
      )}
    </div>
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

export default Page;
