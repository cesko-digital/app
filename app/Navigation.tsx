import Image from "next/image";
import Link from "next/link";

import { Route } from "~/src/routing";

import AuthContext, { SessionToolbar } from "./SessionToolbar";
import { SecondLevelNav } from "./SiteNav";

export const DesktopNav = () => (
  <div className="flex flex-row gap-12 lg:grid lg:grid-cols-3">
    <div className="-mt-[21px] hidden lg:block">
      <FullLogo />
    </div>
    <div className="lg:hidden">
      <SquareLogo />
    </div>
    <div className="col-span-2 flex grow flex-row items-end">
      <div className="flex flex-col gap-7 md:max-lg:gap-3">
        <FirstLevelNav />
        <SecondLevelNav />
      </div>
      <div className="ml-auto">
        <SessionNav />
      </div>
    </div>
  </div>
);

export const SquareLogo = () => (
  <Link href="/">
    <Image
      className="select-none"
      src="/logo.png"
      width={60}
      height={60}
      alt="Česko.Digital"
    />
  </Link>
);

export const FullLogo = () => (
  <Link href="/">
    <Image
      className="select-none"
      src="/logo.svg"
      width={255}
      height={53}
      alt="Česko.Digital"
    />
  </Link>
);

export const FirstLevelNav = () => (
  <ul className="flex flex-row gap-7 text-xl">
    <li>
      <Link href="https://cesko.digital" className="typo-link">
        Co děláme
      </Link>
    </li>
    <li className="font-semibold">
      <Link href="/">Zapojte se</Link>
    </li>
    <li>
      <Link href={Route.blog} className="typo-link">
        Blog
      </Link>
    </li>
  </ul>
);

export const SessionNav = () => (
  <AuthContext>
    <SessionToolbar />
  </AuthContext>
);
