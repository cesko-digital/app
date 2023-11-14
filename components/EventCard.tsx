import { Event, isEventPast } from "src/data/event";
import { Route } from "src/routing";
import { TextPill } from "./TextPill";
import { Card } from "./Card";

export type Props = {
  event: Event;
  badgeImageUrl?: string;
};

export const EventCard = ({ event, badgeImageUrl }: Props) => {
  const past = isEventPast(event);
  const pastDateStyle: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "numeric",
    year: "2-digit",
  };
  const futureDateStyle: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const time = new Date(event.startTime).toLocaleString(
    "cs-CZ",
    past ? pastDateStyle : futureDateStyle
  );
  /* TBD: Make the cover non-optional? */
  return (
    <Card
      coverImageUrl={event.coverImageUrl!}
      badgeImageUrl={badgeImageUrl}
      linkUrl={Route.toEvent(event)}
      fade={past}
    >
      <div className="-mt-2 p-7 flex flex-col gap-3">
        <div className="typo-caption">
          {isEventPast(event) && <TextPill text="proběhlo" inverted />}
          <TextPill text={time} />
          {!past && event.locationTitle && (
            <TextPill text={event.locationTitle} />
          )}
        </div>
        <h3 className="typo-title3">{event.name}</h3>
        <p>{event.summary}</p>
      </div>
    </Card>
  );
};
