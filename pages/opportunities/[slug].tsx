import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { siteData } from "lib/site-data";
import {
  OpportunityDetailPage,
  PageProps,
} from "components/dashboard/opportunity/detail";

interface QueryParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const paths = siteData.opportunities.map((opportunity) => ({
    params: { slug: opportunity.slug },
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
  const { opportunities, projects, users } = siteData;
  const opportunity = opportunities.find((o) => o.slug === slug)!;
  return {
    props: {
      opportunity,
      opportunities: opportunities.filter((o) => o.status === "live"),
      projects,
      users,
    },
  };
};

export default OpportunityDetailPage;
