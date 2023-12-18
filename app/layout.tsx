import type { Metadata } from "next";

import "./globals.css";

import Image from "next/image";
import Link from "next/link";

import { getServerSession } from "next-auth";

import { SessionToolbar } from "~/app/SessionToolbar";
import { authOptions } from "~/src/utils";

export const metadata: Metadata = {
  metadataBase: new URL("https://app.cesko.digital"),
  title: "Česko.Digital – příležitosti k zapojení",
  description: "Provázíme veřejnou správu a nezisk digitální transformací",
  openGraph: {
    images: "https://data.cesko.digital/web/metadata-cover.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
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
          <SessionToolbar session={session} />
        </div>
        {children}
      </body>
    </html>
  );
}
