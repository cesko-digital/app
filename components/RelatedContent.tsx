import { type ReactNode } from "react";
import Link from "next/link";

export type Props = {
  /** Heading for the whole section */
  label: string;
  /** Content to render in the section */
  children: ReactNode;
  seeAllUrl?: string;
  seeAllLabel?: string;
};

export const RelatedContent = ({
  label,
  children,
  seeAllUrl,
  seeAllLabel,
}: Props) => (
  <section>
    <div className="flex items-center gap-7 md:flex-row">
      <h2 className="typo-title2 mb-4">{label}</h2>
      {seeAllUrl && (
        <Link href={seeAllUrl} className="typo-link ml-auto mr-1">
          {seeAllLabel}
        </Link>
      )}
    </div>
    {children}
  </section>
);
