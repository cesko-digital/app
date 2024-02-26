import Link from "next/link";

import clsx from "clsx";

type Props = {
  href: string;
  title: string;
  isActive: boolean;
};

export const ServerTabBar = ({ href, title, isActive }: Props) => (
  <li className="me-2">
    <Link
      href={href}
      className={clsx(
        "inline-block cursor-pointer whitespace-nowrap border-b-2 p-4",
        isActive ? "border-it" : "border-transparent",
      )}
    >
      {title}
    </Link>
  </li>
);
