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
  const duration = getEventDuration(event);
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
      {duration && <Info title="Délka akce" content={`${duration} minut`} />}
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

function getEventDuration(event: PortalEvent): number | null {
  if (event.endTime) {
    const start = new Date(event.startTime);
    const end = new Date(event.endTime);
    const ms = end.getTime() - start.getTime();
    const minutes = ms / 1000 / 60;
    const minutesPerDay = 60 * 24;
    // Do a basic sanity check
    return minutes > 0 && minutes < minutesPerDay ? minutes : null;
  } else {
    return null;
  }
}

export default EventCard;
