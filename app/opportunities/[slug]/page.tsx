import { Breadcrumbs } from "components/Breadcrumbs";
import { LegacyUserImageLabel, ProjectImageLabel } from "components/ImageLabel";
import { MarkdownContent } from "components/MarkdownContent";
import { OpportunityRow } from "components/OpportunityRow";
import { RelatedContent } from "components/RelatedContent";
import { Sidebar } from "components/Sidebar";
import Image from "next/image";
import { notFound } from "next/navigation";
import { LegacyUser, getUserById } from "src/data/legacy-user";
import { Opportunity, getAllOpportunities } from "src/data/opportunity";
import { Project, getAllProjects } from "src/data/project";
import { getAlternativeOpenRoles } from "src/data/queries";
import { Route } from "src/routing";

type Params = {
  slug: string;
};

export type Props = {
  params: Params;
};

/** Detail page of an open role */
async function Page({ params }: Props) {
  const allRoles = await getAllOpportunities("Show to Users");
  const allProjects = await getAllProjects();
  const role = allRoles.find((r) => r.slug === params.slug) || notFound();
  const projectForRole = (role: Opportunity) =>
    allProjects.find((p) => p.id === role.projectId)!;
  const project = projectForRole(role);
  const owner = (await getUserById(role.ownerId))!;
  const otherRoles = await getAlternativeOpenRoles(role);
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mb-20">
        <section className="lg:col-span-2">
          <h2 className="typo-title2">O roli</h2>
          <MarkdownContent source={role.summary.source} />
        </section>
        <aside>
          <RoleSidebar project={project} role={role} owner={owner} />
        </aside>
      </div>

      <RelatedContent
        label="Další hledané role"
        seeAllLabel="Všechny hledané role"
        seeAllUrl={Route.opportunities}
        content={otherRoles.map((r) => (
          <OpportunityRow key={r.id} role={r} project={projectForRole(r)} />
        ))}
      />
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
  return (
    <Sidebar
      primaryCTA={<ContactButton role={role} />}
      sections={[
        {
          label: "Projekt",
          content: <ProjectImageLabel project={project} />,
        },
        {
          label: "Časová náročnost",
          content: role.timeRequirements,
        },
        {
          label: "Kontaktní osoba",
          content: <LegacyUserImageLabel user={owner} />,
        },
      ]}
    />
  );
};

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

// Generate static pages for all open roles at build time
export async function generateStaticParams() {
  const roles = await getAllOpportunities("Show to Users");
  return roles.map(({ slug }) => ({ slug }));
}

export default Page;
