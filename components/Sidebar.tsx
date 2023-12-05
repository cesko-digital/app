import { ReactNode } from "react";

export type Section = {
  /** Section label */
  label: string;
  /** Section content */
  content: ReactNode;
  /** If present and `false`, section will be skipped */
  onlyIf?: boolean;
};

export type Props = {
  /** Sidebar sections */
  sections: Section[];
  /** Primary call-to-action to put at the bottom of the sidebar */
  primaryCTA?: ReactNode;
};

/**
 * Generic sidebar component
 *
 * Gray rounded sidebar with multiple headlined sections and possibly
 * a primary call-to-action component.
 */
export const Sidebar = ({ sections, primaryCTA }: Props) => (
  <SidebarContainer>
    {sections.map(
      ({ label, content, onlyIf: condition = true }) =>
        condition && (
          <div key={label}>
            <h2 className="typo-title3 mb-2">{label}</h2>
            {content}
          </div>
        ),
    )}
    {primaryCTA && <div className="mt-4">{primaryCTA}</div>}
  </SidebarContainer>
);

/**
 * Bare sidebar
 */
export const SidebarContainer = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col gap-7 rounded-xl bg-pebble p-7">{children}</div>
);
