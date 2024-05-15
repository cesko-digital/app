"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Route } from "~/src/routing";

export const SecondLevelNav = () => {
  const path = usePathname();
  const activeOnPrefix = (prefix: string) =>
    path.startsWith(prefix) ? "font-semibold" : "typo-link";
  return (
    <ul className="flex flex-col flex-wrap gap-7 md:flex-row">
      <li>
        <Link href={Route.projects} className={activeOnPrefix("/projects")}>
          Projekty
        </Link>
      </li>
      <li>
        <Link
          href={Route.opportunities}
          className={activeOnPrefix("/opportunities")}
        >
          Hledané role
        </Link>
      </li>
      <li>
        <Link href={Route.events} className={activeOnPrefix("/events")}>
          Akce
        </Link>
      </li>
    </ul>
  );
};
