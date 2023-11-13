import { Breadcrumbs } from "components/Breadcrumbs";
import { MarkdownContent } from "components/MarkdownContent";
import { Sidebar } from "components/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LegacyUser, getUserById } from "src/data/legacy-user";
import { Opportunity, getAllOpportunities } from "src/data/opportunity";
import { Project, findProjectById } from "src/data/project";
import { Route } from "src/routing";

type Params = {
  slug: string;
};

export type Props = {
  params: Params;
};

/** Detail page of a wanted role */
async function Page({ params }: Props) {
  const allRoles = await getAllOpportunities("Show to Users");
  const role = allRoles.find((r) => r.slug === params.slug) || notFound();
  const project = (await findProjectById(role.projectId))!;
  const owner = (await getUserById(role.ownerId))!;
  return (
    <main className="py-20 px-7 max-w-content m-auto">
      <Breadcrumbs
        path={[
          { label: "Homepage", path: "/" },
          {
            label: "Hledané role",
            path: Route.opportunities,
          },
        ]}
        currentPage={role.name}
      />

      <h1 className="typo-title mt-7 mb-10">{role.name}</h1>

      <div className="aspect-[2.3] relative mb-10">
        <Image
          src={project.coverImageUrl}
          className="object-cover bg-gray grayscale"
          alt=""
          fill
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        <section className="lg:col-span-2">
          <h2 className="typo-title2">O roli</h2>
          <MarkdownContent source={role.summary.source} />
        </section>
        <aside>
          <RoleSidebar project={project} role={role} owner={owner} />
        </aside>
      </div>
    </main>
  );
}

const RoleSidebar = ({
  role,
  project,
  owner,
}: {
  role: Opportunity;
  project: Project;
  owner: LegacyUser;
}) => {
  const projectLink =
    project.state !== "draft" ? Route.toProject(project) : undefined;
  return (
    <Sidebar
      primaryCTA={<ContactButton role={role} />}
      sections={[
        {
          label: "Projekt",
          content: (
            <CircleImageWithLabel
              imageUrl={project.logoUrl}
              label={project.name}
              link={projectLink}
            />
          ),
        },
        {
          label: "Časová náročnost",
          content: role.timeRequirements,
        },
        {
          label: "Kontaktní osoba",
          content: (
            <CircleImageWithLabel
              imageUrl={owner.profilePictureUrl}
              label={owner.name}
            />
          ),
        },
      ]}
    />
  );
};

const CircleImageWithLabel = ({
  imageUrl,
  label,
  link,
}: {
  imageUrl: string;
  label: string;
  link?: string;
}) => (
  <div className="flex flex-row gap-4 items-center">
    <Image
      src={imageUrl}
      className="rounded-full shadow"
      width={60}
      height={60}
      alt=""
    />
    {!link && <span>{label}</span>}
    {link && (
      <Link className="typo-link" href={link}>
        {label}
      </Link>
    )}
  </div>
);

const ContactButton = ({ role }: { role: Opportunity }) => {
  return (
    <div>
      <a href={role.contactUrl} className="block btn-primary text-center">
        {getContactButtonLabel(role.contactUrl)}
      </a>
    </div>
  );
};

const getContactButtonLabel = (contactUrl: string) => {
  if (contactUrl.startsWith("https://cesko-digital.slack.com/")) {
    return "Kontaktovat přes Slack";
  } else if (contactUrl.startsWith("mailto:")) {
    return "Kontaktovat mailem";
  } else {
    return "Kontaktovat";
  }
};

export default Page;
