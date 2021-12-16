import * as S from "./styles";
import { ButtonAsLink } from "components/links";
import Project from "./project";
import Garant from "./garant";
import Info from "./info";
import { PortalEvent, PortalProject, PortalUser } from "lib/portal-types";

interface EventCardProps {
  event: PortalEvent;
  owner: PortalUser;
  project: PortalProject;
}

const EventCard: React.FC<EventCardProps> = ({ event, owner, project }) => {
  return (
    <S.Container>
      <Project project={project} />
      <Garant user={owner} />
      <Info
        title="Datum konání"
        content={new Date(event.startTime).toLocaleString("cs-CZ", {
          weekday: "short",
          day: "numeric",
          month: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      />
      {event.locationTitle && (
        <Info
          title="Místo konání"
          content={event.locationTitle}
          url={event.locationUrl}
        />
      )}
      {event.registrationUrl && (
        <ButtonAsLink to={event.registrationUrl}>
          {event.registrationTitle}
        </ButtonAsLink>
      )}
    </S.Container>
  );
};

export default EventCard;
