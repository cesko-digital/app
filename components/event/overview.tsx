import { PortalEvent } from "lib/portal-types";

type PageProps = {
  events: readonly PortalEvent[];
};

const EventOverviewPage: React.FC<PageProps> = ({ events }) => {
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

export default EventOverviewPage;
