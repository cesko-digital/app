import { ReactNode } from "react";

export type Item = {
  label: string;
  content: ReactNode;
  onlyIf?: boolean;
};

export type Props = {
  items: Item[];
  primaryCTA?: ReactNode;
};

export const Sidebar = ({ items, primaryCTA }: Props) => (
  <div className="p-7 bg-pebble rounded-xl flex flex-col gap-7">
    {items.map(
      ({ label, content, onlyIf: condition = true }) =>
        condition && (
          <div key={label}>
            <h2 className="typo-title3 mb-4">{label}</h2>
            {content}
          </div>
        )
    )}
    {primaryCTA && <div className="mt-4">{primaryCTA}</div>}
  </div>
);
