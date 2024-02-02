import clsx from "clsx";

import useHash from '~/components/hooks/hash';

export type Item<Key> = {
  key: Key;
  title: string;
  hash: string;
};

export type Props<Key> = {
  items: Item<Key>[];
  activeKey: Key;
  onChange?: (key: Key) => void;
};

export const TabBar = <Key extends string>({
  items,
  activeKey,
  onChange,
}: Props<Key>) => {
  const Tab = (item: Item<Key>) => {
    const isActive = activeKey === item.key;
    return (
      <li key={item.key} className="me-2">
        <a
          href={`#${item.hash}`}
          onClick={() => onChange && onChange(item.key)}
          className={clsx(
            "inline-block cursor-pointer whitespace-nowrap border-b-2 p-4",
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
      <ul className="no-scrollbar -mb-px flex overflow-x-auto">
        {items.map(Tab)}
      </ul>
    </div>
  );
};

export type SimpleItem = {
  title: string;
  hash: string;
  content: React.ReactNode;
};

export const SimpleTabBar = ({ items }: { items: SimpleItem[] }) => {
  const hash = useHash();
  const activeItem = items.find((item) => item.hash === hash) ?? items[0];

  return (
    <div className="flex flex-col gap-7">
      <TabBar
        items={items.map(({ title, hash }) => ({ key: title, title, hash }))}
        activeKey={activeItem.title}
      />
      {activeItem.content}
    </div>
  );
};
