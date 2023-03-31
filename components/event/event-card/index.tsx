import * as S from "./styles";
import { ButtonLink } from "components/links";
import Project from "./project";
import Garant from "./garant";
import Info from "./info";
import strings from "content/strings.json";
import { PortalUser } from "lib/airtable/user";
import { PortalProject } from "lib/airtable/project";
import { getEventDuration, PortalEvent } from "lib/airtable/event";
import { Button } from "components/buttons";
import { signIn } from "next-auth/react";
import { Route } from "lib/routing";
import Plausible from "plausible-tracker";
import { useEventRegistrationStatus } from "app/events/hooks";

interface EventCardProps {
  event: PortalEvent;
  owner: PortalUser;
  project: PortalProject;
}

const EventCard = ({ event, owner, project }: EventCardProps) => {
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
      {!event.quickRegistrationMode && event.registrationUrl && (
        <ButtonLink to={event.registrationUrl}>
          {event.registrationTitle}
        </ButtonLink>
      )}
      {event.quickRegistrationMode && <QuickRegistrationButton event={event} />}
    </S.Container>
  );
};

type QuickRegistrationButtonProps = {
  event: PortalEvent;
};

const QuickRegistrationButton = ({ event }: QuickRegistrationButtonProps) => {
  const [registrationStatus, setRegistrationStatus] =
    useEventRegistrationStatus(event);
  switch (registrationStatus.state) {
    case "updating":
      return <Button disabled>Moment…</Button>;
    case "error":
      return <Button disabled>Chyba 😞</Button>;
    case "ready":
      return registrationStatus.registered ? (
        <Button onClick={() => setRegistrationStatus(false)}>
          Zrušit registraci
        </Button>
      ) : (
        <Button onClick={() => setRegistrationStatus(true)}>
          Zaregistrovat
        </Button>
      );
    case "notSignedIn":
      return (
        <>
          <SignInButton />
          <p>
            Pro registraci na akci se musíš nejdřív přihlásit naším slackovým
            účtem. Pokud ještě nejsi v našem Slacku,{" "}
            <a href={Route.joinUs}>přidej se</a>!
          </p>
        </>
      );
  }
};

const SignInButton = () => {
  const { trackEvent } = Plausible({ domain: "cesko.digital" });
  const handleClick = () => {
    trackEvent("SignIn");
    signIn("slack");
  };
  return <Button onClick={handleClick}>Přihlásit se</Button>;
};

export default EventCard;
