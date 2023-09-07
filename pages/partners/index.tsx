import { GetStaticProps } from "next";
import { siteData } from "lib/site-data";
import { Props, Page } from "app/partners/_page";

export const getStaticProps: GetStaticProps<Props> = async () => {
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
