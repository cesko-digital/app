import type { Metadata } from "next";

import "./globals.css";

import Image from "next/image";
import Link from "next/link";

import { Route } from "~/src/routing";

export const metadata: Metadata = {
  title: "Česko.Digital TBD",
  description: "TBD",
  openGraph: {
    images: "https://data.cesko.digital/web/metadata-cover.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <head>
        <link rel="shortcut icon" type="image/png" href="/logo.png" />
        <link rel="me" href="https://mastodon.cesko.digital/@ceskodigital" />
        <script
          data-domain="app.cesko.digital"
          src="https://plausible.io/js/script.outbound-links.js"
          defer
        />
      </head>
      <body>
        <div className="m-auto -mb-10 mt-7 flex max-w-content flex-row items-center gap-7 px-7">
          <Link href="/">
            <Image
              className="bg-it"
              src="/logo.png"
              width={60}
              height={60}
              alt="Česko.Digital"
            />
          </Link>
          <div className="ml-auto flex flex-row gap-4">
            <span className="typo-link cursor-not-allowed">Přihlásit se</span>
            <a className="typo-link" href={Route.register}>
              Registrovat
            </a>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
