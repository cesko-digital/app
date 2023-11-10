import Link from "next/link";
import { Fragment } from "react";

export type Crumb = { label: string; path: string };

export const Breadcrumbs = ({
  path,
  currentPage,
}: {
  path: Crumb[];
  currentPage: string;
}) => (
  <div className="typo-caption">
    {path.map(({ label, path }) => (
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
