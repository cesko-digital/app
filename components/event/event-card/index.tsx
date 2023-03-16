import * as S from "./styles";
import { ButtonLink } from "components/links";
import Project from "./project";
import Garant from "./garant";
import Info from "./info";
import strings from "content/strings.json";
import { PortalUser } from "lib/airtable/user";
import { PortalProject } from "lib/airtable/project";
import { getEventDuration, PortalEvent } from "lib/airtable/event";

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
        <ButtonLink to={event.registrationUrl}>
          {event.registrationTitle}
        </ButtonLink>
      )}
    </S.Container>
  );
};

export default EventCard;
