import type { NextPage, GetStaticProps } from "next";
import { siteData } from "lib/site-data";
import { PortalEvent } from "lib/airtable/event";

type PageProps = {
  events: readonly PortalEvent[];
};

const Page: NextPage<PageProps> = ({ events }) => {
  return (
    <div>
      <h1>Events</h1>
      <p>
        Tohle ještě není implementované. Nechtěli byste nám s tím pomoct?{" "}
        <a href="https://github.com/cesko-digital/web/issues/356">
          Tady je příslušný ticket
        </a>
        .
      </p>
    </div>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  return {
    props: {
      events: siteData.events,
    },
  };
};

export default Page;
