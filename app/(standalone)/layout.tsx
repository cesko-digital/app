import "../globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <head>
        <link rel="shortcut icon" type="image/png" href="/logo.png" />
        <script
          data-domain="app.cesko.digital"
          src="https://plausible.io/js/script.outbound-links.js"
          defer
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
