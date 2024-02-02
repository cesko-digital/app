import { Breadcrumbs } from "~/components/Breadcrumbs";
import { ServerTabBar } from "~/components/ServerTabBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs
        path={[{ label: "Homepage", path: "/" }]}
        currentPage="Statistiky"
      />
      <h1 className="typo-title mb-10 mt-7">Statistiky</h1>
      <ServerTabBar
        items={[
          {
            title: "Metriky",
            href: "/stats",
          },
          {
            title: "Foo",
            href: "/stats/foo",
          },
        ]}
      />
      <div className="mt-7">{children}</div>
    </main>
  );
}
