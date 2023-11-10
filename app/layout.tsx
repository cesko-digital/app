import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Česko.Digital TBD",
  description: "TBD",
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
      </head>
      <body>{children}</body>
    </html>
  );
}
