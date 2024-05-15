"use client";

import { useState } from "react";

import clsx from "clsx";

import {
  FirstLevelNav,
  SecondLevelNav,
  SessionNav,
  SquareLogo,
} from "./Navigation";

export const MobileNav = () => {
  const [isOpen, setOpen] = useState(false);

  const Ham = () => (
    <div className="flex aspect-square w-[40px] flex-col justify-between">
      <div className="h-[5px] w-full bg-it"></div>
      <div className="h-[5px] w-full bg-it"></div>
      <div className="h-[5px] w-full bg-it"></div>
    </div>
  );

  const CrossIcon = () => <div className="pb-2 text-[70px] text-it">✕</div>;

  const MenuToggle = () => (
    <button
      onClick={(_) => setOpen((open) => !open)}
      className="cursor-pointer"
      aria-label="Menu"
      aria-expanded={isOpen}
    >
      {isOpen ? <CrossIcon /> : <Ham />}
    </button>
  );

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between md:hidden">
        <SquareLogo />
        <MenuToggle />
      </div>
      <div
        aria-hidden={!isOpen}
        className={clsx(
          // We could hide the menu simply by not including the appropriate
          // nodes when the menu is closed, but that keeps resetting the menu
          // state such as session management items, so we use zero height instead
          // to preserve the state. This also allows us to animate the transition.
          "flex flex-col gap-7 overflow-clip transition-all",
          isOpen ? "mt-10" : "h-0",
        )}
      >
        <FirstLevelNav />
        <SecondLevelNav />
        <SessionNav />
      </div>
    </div>
  );
};
