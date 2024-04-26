"use client";

import { useState } from "react";

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

  const ToggleMenu = () => (
    <button
      onClick={(_) => setOpen((open) => !open)}
      className="cursor-pointer"
      aria-label="Menu"
      aria-expanded={isOpen}
    >
      {!isOpen && <Ham />}
      {isOpen && <CrossIcon />}
    </button>
  );
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between md:hidden">
        <SquareLogo />
        <ToggleMenu />
      </div>
      {isOpen && (
        <div className="flex flex-col gap-7">
          <FirstLevelNav />
          <SecondLevelNav />
          <SessionNav />
        </div>
      )}
    </div>
  );
};
