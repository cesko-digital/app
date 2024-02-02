import { notFound } from "next/navigation";

export default async function Page({
  params: { tab },
}: {
  params: { tab: string };
}) {
  switch (tab) {
    case "metrics":
      return <div>This is metrics</div>;
    case "foo":
      return <div>This is foo</div>;
    default:
      notFound();
  }
}
