import Link from "next/link";

import clsx from "clsx";

export type Item = {
  href: string;
  title: string;
};

export type Props = {
  items: Item[];
};

export const ServerTabBar = ({ items }: Props) => {
  const Tab = (item: Item) => {
    const isActive = false; // TODO
    return (
      <li key={item.title} className="me-2">
        <Link
          href={item.href}
          className={clsx(
            "inline-block cursor-pointer whitespace-nowrap border-b-2 p-4",
            isActive ? "border-it" : "border-transparent",
          )}
        >
          {item.title}
        </Link>
      </li>
    );
  };

  return (
    <nav className="border-b border-gravel text-center">
      <ul className="no-scrollbar -mb-px flex overflow-x-auto">
        {items.map(Tab)}
      </ul>
    </nav>
  );
};
