import Link from "next/link";
import { ReactNode } from "react";

export type Props = {
  /** Heading for the whole section */
  label: string;
  /** Content to render in the section */
  content: ReactNode;
  seeAllUrl?: string;
  seeAllLabel?: string;
};

export const RelatedContent = ({
  label,
  content,
  seeAllUrl,
  seeAllLabel,
}: Props) => (
  <section>
    <div className="flex md:flex-row gap-7 items-center">
      <h2 className="typo-title2 mb-4">{label}</h2>
      {seeAllUrl && (
        <Link href={seeAllUrl} className="typo-link ml-auto mr-1">
          {seeAllLabel}
        </Link>
      )}
    </div>
    {content}
  </section>
);
