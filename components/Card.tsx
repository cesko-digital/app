import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export type CardProps = {
  coverImageUrl: string;
  badgeImageUrl?: string;
  children: ReactNode;
  linkUrl: string;
  fade?: boolean;
};

export const Card = ({
  coverImageUrl,
  linkUrl,
  badgeImageUrl,
  fade = false,
  children,
}: CardProps) => (
  <Link
    className="block overflow-clip rounded-xl border-2 border-gray hover:border-it hover:shadow-lg"
    href={linkUrl}
  >
    <div className="aspect-[2] relative">
      <Image
        src={coverImageUrl}
        sizes="(min-width: 1200px) 400px, 100vw"
        alt=""
        className={clsx(
          "bg-gray object-cover",
          fade && "grayscale-[75%] opacity-75"
        )}
        fill
      />
    </div>
    {badgeImageUrl && (
      <Image
        src={badgeImageUrl}
        className={clsx(
          "drop-shadow-xl rounded-full -mt-[55px] ml-7 bg-white",
          // This fixes the appearance of non-square images
          "aspect-square object-cover object-top"
        )}
        alt=""
        width={80}
        height={80}
      />
    )}
    {children}
  </Link>
);
