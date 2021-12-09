import type { NextPage, GetStaticProps } from "next";
import { getAllOpportunities } from "lib/airtable-import";
import { PortalOpportunity } from "lib/portal-types";
import { prepareToSerialize } from "lib/utils";

type PageProps = {
  opportunities: PortalOpportunity[];
};

const Page: NextPage<PageProps> = ({ opportunities }) => {
  return (
    <div>
      <h1>Opportunities</h1>
      <ul>
        {opportunities.map((opportunity) => (
          <li>
            <OpportunityLink {...opportunity} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const OpportunityLink: React.FC<PortalOpportunity> = (o) => {
  const path = `/opportunities/${o.id}`;
  return <a href={path}>{o.name}</a>;
};

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const apiKey = process.env.AIRTABLE_API_KEY as string;
  const ops = await getAllOpportunities(apiKey);
  return {
    props: {
      opportunities: prepareToSerialize(ops),
    },
  };
};

export default Page;
