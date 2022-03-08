import { PortalPartner } from "lib/portal-types";
import { NextPage, GetStaticProps } from "next";
import { siteData } from "lib/site-data";
import { Article } from "lib/related-blog-posts";
import PartnersPage from "components/partners/page";

type PageProps = {
  partners: readonly PortalPartner[];
  blogPosts: readonly Article[];
};

const Page: NextPage<PageProps> = ({ partners, blogPosts }) => {
  return <PartnersPage partners={partners} blogPosts={blogPosts} />;
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const partners = siteData.partners;
  const blogPosts = siteData.blogPosts
    .filter((post) => post.tags.some((t) => t === "partners"))
    .reverse()
    .slice(0, 3);
  return {
    props: {
      partners,
      blogPosts,
    },
  };
};

export default Page;
