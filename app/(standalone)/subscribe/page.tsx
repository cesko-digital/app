import { Metadata } from "next";

import { SubscribePage } from "./SubscribePage";

export const metadata: Metadata = {
  title: "Česko.Digital ve vaší schránce",
  description:
    "Nechte si posílat zajímavé informace o digitalizaci nezisku a veřejné správy",
  openGraph: {
    images: "https://assets.cesko.digital/dc96d81b.jpg",
  },
};

export default function Page() {
  return (
    <div className="m-auto my-10 flex max-w-prose flex-col gap-8 p-8">
      <h1 className="typo-title">Česko.Digital ve vaší schránce</h1>
      <SubscribePage />
    </div>
  );
}
