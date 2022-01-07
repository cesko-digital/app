import type { NextPage, GetStaticProps } from "next";
import { PortalEvent } from "lib/portal-types";
import { prepareToSerialize } from "lib/utils";
import { appState } from "lib/app-state";

type PageProps = {
  events: PortalEvent[];
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
      events: prepareToSerialize(appState.events),
    },
  };
};

export default Page;
