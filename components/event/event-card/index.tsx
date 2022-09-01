import * as S from "./styles";
import { ButtonAsLink } from "components/links";
import Project from "./project";
import Garant from "./garant";
import Info from "./info";
import { PortalEvent, PortalProject } from "lib/portal-types";
import { getEventDuration } from "lib/portal-type-utils";
import strings from "content/strings.json";
import { PortalUser } from "lib/airtable/user";

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
        title={strings.components.cards.eventCard.date}
        content={new Date(event.startTime).toLocaleString("cs-CZ", {
          weekday: "short",
          day: "numeric",
          month: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      />
      {duration && (
        <Info
          title={strings.components.cards.eventCard.duration}
          content={duration}
        />
      )}
      {event.locationTitle && (
        <Info
          title={strings.components.cards.eventCard.place}
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
