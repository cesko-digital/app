import { Breadcrumbs } from "~/components/Breadcrumbs";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs currentPage="Přihlásit se" />
      <section className="m-auto mt-10 flex max-w-[80ex] flex-col gap-7 rounded-2xl border-2 border-gray p-7 pb-10 text-center lg:mt-20">
        {children}
      </section>
    </main>
  );
};

export default Layout;
