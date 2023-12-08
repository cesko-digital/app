import { type ReactNode } from "react";
import Link from "next/link";

/** Generic sidebar container */
export const Sidebar = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col gap-7 rounded-xl bg-pebble p-7">{children}</div>
);

/** Sidebar section with a heading */
export const SidebarSection = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <div key={title}>
    <h2 className="typo-title3 mb-2">{title}</h2>
    {children}
  </div>
);

/** Simple primary button that spans the whole sidebar width */
export const SidebarCTA = ({
  href,
  label,
}: {
  href: string;
  label: string;
}) => (
  <div>
    <Link href={href} className="btn-primary block text-center">
      {label}
    </Link>
  </div>
);
