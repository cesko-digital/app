import { Fragment } from "react";
import Link from "next/link";

export type Crumb = { label: string; path: string };

export type Props = {
  path?: Crumb[];
  currentPage: string;
};

export const Breadcrumbs = ({ path = [], currentPage }: Props) => {
  const rootedPath: Crumb[] = [{ label: "Česko.Digital", path: "/" }, ...path];
  return (
    <div className="typo-caption">
      {rootedPath.map(({ label, path }) => (
        <Fragment key={label}>
          <Link href={path} className="typo-link">
            {label}
          </Link>
          <span className="inline-block px-2 text-gravel">/</span>
        </Fragment>
      ))}
      <span className="text-gravel">{currentPage}</span>
    </div>
  );
};
