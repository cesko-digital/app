import { useState } from "react";

import clsx from "clsx";

export type Item = {
  key: string;
  title: string;
};

export type Props = {
  items: Item[];
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
};

/** TBD: Improve on mobile */
export const TabBar = ({ items, defaultActiveKey, onChange }: Props) => {
  const [activeKey, setActiveKey] = useState<string>(
    defaultActiveKey ?? items[0].key,
  );

  const clickHandler = (key: string) => {
    setActiveKey(key);
    if (onChange) {
      onChange(key);
    }
  };

  const Tab = (item: Item) => {
    const isActive = activeKey === item.key;
    return (
      <li key={item.key} className="me-2">
        <a
          onClick={() => clickHandler(item.key)}
          className={clsx(
            "hover:text-gray-600 inline-block cursor-pointer rounded-t-lg border-b-2 border-transparent p-4",
            isActive && "border-it",
          )}
        >
          {item.title}
        </a>
      </li>
    );
  };

  return (
    <div className="border-b border-gravel text-center">
      <ul className="-mb-px flex flex-wrap">{items.map(Tab)}</ul>
    </div>
  );
};
