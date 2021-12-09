import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { getAllOpportunities } from "lib/airtable-import";
import { PortalOpportunity } from "lib/portal-types";
import { prepareToSerialize } from "lib/utils";

type PageProps = {
  opportunity: PortalOpportunity;
};

const Page: NextPage<PageProps> = ({ opportunity }) => {
  return (
    <div>
      <h1>{opportunity.name}</h1>
      <code>{opportunity.summary.source}</code>
    </div>
  );
};

// TODO: Can we type this tighter?
export const getStaticPaths: GetStaticPaths = async () => {
  const apiKey = process.env.AIRTABLE_API_KEY as string;
  const events = await getAllOpportunities(apiKey);
  const paths = events.map((opportunity) => ({
    params: { slug: opportunity.slug },
  }));
  return {
    paths,
    fallback: false,
  };
};

// TODO: Can we type this tighter?
export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const apiKey = process.env.AIRTABLE_API_KEY as string;
  const opportunities = await getAllOpportunities(apiKey);
  const opportunity = opportunities.find((o) => o.slug === params!.slug)!;
  return {
    props: prepareToSerialize({ opportunity: opportunity }),
    revalidate: 1,
  };
};

export default Page;
