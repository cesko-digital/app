import { GetStaticProps } from "next";
import { siteData } from "lib/site-data";
import { PartnersPage, PageProps } from "components/partners/page";

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

export default PartnersPage;
