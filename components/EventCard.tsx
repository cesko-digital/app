import Image from "next/image";
import { Event } from "src/data/event";
import { Route } from "src/routing";

export type Props = {
  event: Event;
  badgeImageUrl?: string;
};

// TBD: Image sizing
export const EventCard = ({ event, badgeImageUrl }: Props) => (
  <a
    className="block overflow-clip rounded-xl border-2 border-gray hover:border-it hover:shadow-lg"
    key={event.id}
    href={Route.toEvent(event)}
  >
    <div className="aspect-[2] relative">
      {/* TBD: Make the cover non-optional */}
      <Image
        src={event.coverImageUrl!}
        alt=""
        className="bg-gray"
        objectFit="cover"
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
    <div className="p-7 flex flex-col gap-4">
      <h3 className="typo-title3">{event.name}</h3>
      <p>{event.summary}</p>
    </div>
  </a>
);
