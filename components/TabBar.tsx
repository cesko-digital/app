import { useState } from "react";

import clsx from "clsx";

export type Item<Key> = {
  key: Key;
  title: string;
};

export type Props<Key> = {
  items: Item<Key>[];
  defaultActiveKey?: Key;
  onChange?: (key: Key) => void;
};

/** TBD: Improve on mobile */
export const TabBar = <Key extends string>({
  items,
  defaultActiveKey,
  onChange,
}: Props<Key>) => {
  const [activeKey, setActiveKey] = useState<Key>(
    defaultActiveKey ?? items[0].key,
  );

  const clickHandler = (key: Key) => {
    setActiveKey(key);
    if (onChange) {
      onChange(key);
    }
  };

  const Tab = (item: Item<Key>) => {
    const isActive = activeKey === item.key;
    return (
      <li key={item.key} className="me-2">
        <a
          onClick={() => clickHandler(item.key)}
          className={clsx(
            "inline-block cursor-pointer border-b-2 p-4",
            isActive ? "border-it" : "border-transparent",
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

export type SimpleItem = {
  title: string;
  content: React.ReactNode;
};

export const SimpleTabBar = ({ items }: { items: SimpleItem[] }) => {
  const [activeKey, setActiveKey] = useState(items[0].title);
  return (
    <div className="flex flex-col gap-7">
      <TabBar
        items={items.map(({ title }) => ({ key: title, title }))}
        onChange={setActiveKey}
      />
      {items.find((item) => item.title === activeKey)?.content}
    </div>
  );
};
