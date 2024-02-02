import { Breadcrumbs } from "~/components/Breadcrumbs";
import { ServerTabBar } from "~/components/ServerTabBar";

export default function Layout({
  children,
  params: { tab },
}: {
  children: React.ReactNode;
  params: { tab: string };
}) {
  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs
        path={[{ label: "Homepage", path: "/" }]}
        currentPage="Statistiky"
      />
      <h1 className="typo-title mb-10 mt-7">Statistiky</h1>
      <nav className="border-b border-gravel text-center">
        <ul className="no-scrollbar -mb-px flex overflow-x-auto">
          <ServerTabBar
            title="Metriky"
            href="/stats/metrics"
            isActive={tab === "metrics"}
          />
          <ServerTabBar
            title="Foo"
            href="/stats/foo"
            isActive={tab === "foo"}
          />
        </ul>
      </nav>
      <div className="mt-7">{children}</div>
    </main>
  );
}
