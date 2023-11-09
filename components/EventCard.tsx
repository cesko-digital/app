import Image from "next/image";
import Link from "next/link";
import { Event } from "src/data/event";
import { Route } from "src/routing";

export type Props = {
  event: Event;
  badgeImageUrl?: string;
  fade?: boolean;
};

export const EventCard = ({ event, badgeImageUrl, fade = false }: Props) => {
  const time = new Date(event.startTime).toLocaleString("cs-CZ", {
    weekday: "short",
    day: "numeric",
    month: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const InfoPill = ({ text }: { text: string }) => (
    <span className="inline-block bg-pebble rounded-lg px-2 py-1 typo-caption mr-2 mb-2">
      {text}
    </span>
  );
  return (
    <Link
      className="block overflow-clip rounded-xl border-2 border-gray hover:border-it hover:shadow-lg"
      key={event.id}
      href={Route.toEvent(event)}
    >
      <div className="aspect-[2] relative">
        {/* TBD: Make the cover non-optional? */}
        <Image
          src={event.coverImageUrl!}
          sizes="(min-width: 1200px) 400px, 100vw"
          alt=""
          className={
            fade
              ? "bg-gray object-cover grayscale-[75%] opacity-75"
              : "bg-gray object-cover"
          }
          fill
        />
      </div>
      {badgeImageUrl && (
        <Image
          src={badgeImageUrl}
          className="-mt-[55px] ml-7 rounded-full bg-white drop-shadow-xl"
          alt=""
          width={80}
          height={80}
        />
      )}
      <div className="-mt-2 p-7 flex flex-col gap-3">
        <div>
          <InfoPill text={time} />
          {event.locationTitle && <InfoPill text={event.locationTitle} />}
        </div>
        <h3 className="typo-title3">{event.name}</h3>
        <p>{event.summary}</p>
      </div>
    </Link>
  );
};
