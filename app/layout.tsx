import type { Metadata } from "next";

import "./globals.css";

import { SessionProvider } from "components/SessionProvider";
import { Toaster } from "react-hot-toast";

import { MobileNav } from "./MobileNav";
import { DesktopNav } from "./Navigation";

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
        <SessionProvider>
          <NavigationBar />
          {children}
          {/* It's important to have only a single instance of the `Toaster` in the whole app. */}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}

const NavigationBar = () => {
  return (
    <nav className="w-full bg-pebble lg:pt-6">
      <div className="m-auto -mb-12 max-w-content px-7 py-10">
        <div className="block md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:block">
          <DesktopNav />
        </div>
      </div>
    </nav>
  );
};
