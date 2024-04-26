import Image from "next/image";
import Link from "next/link";

import AuthContext, { SessionToolbar } from "~/app/SessionToolbar";
import { Route } from "~/src/routing";

export const DesktopNav = () => (
  <div className="flex flex-row gap-12 lg:grid lg:grid-cols-3">
    <div className="-mt-[21px] hidden lg:block">
      <FullLogo />
    </div>
    <div className="block lg:hidden">
      <SquareLogo />
    </div>
    <div className="col-span-2 flex grow flex-row items-end">
      <div className="flex flex-col gap-7">
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
  <ul className="flex flex-row gap-7">
    <li>
      <Link href="https://cesko.digital" className="typo-link">
        Co děláme
      </Link>
    </li>
    <li className="font-semibold">Zapojte se</li>
    <li>
      <Link href={Route.blog} className="typo-link">
        Blog
      </Link>
    </li>
  </ul>
);

export const SecondLevelNav = () => (
  <ul className="flex flex-col flex-wrap gap-7 md:flex-row">
    <li>
      <Link href={Route.projects} className="typo-link">
        Projekty
      </Link>
    </li>
    <li>
      <Link href={Route.opportunities} className="typo-link">
        Hledané role
      </Link>
    </li>
    <li>
      <Link href={Route.events} className="typo-link">
        Akce
      </Link>
    </li>
  </ul>
);

export const SessionNav = () => (
  <AuthContext>
    <SessionToolbar />
  </AuthContext>
);
