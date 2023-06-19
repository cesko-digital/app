import { Layout } from "components/layout";
import CasePage from "app/partners/case/_page";
import { Route } from "lib/routing";

/**
 * The “Case for Support” page
 *
 * We try to keep most of the new code in the `app` router, but still use the `page` router
 * for compatibility reasons – so the entry point is here, but all of the code and assets are
 * stored in the `app` folder.
 */
const Page = () => (
  <Layout
    crumbs={[
      { path: Route.partners, label: "Partneři" },
      { label: "Staňte se partnerem" },
    ]}
    head={{ title: "Staňte se partnerem" }}
  >
    <CasePage />
  </Layout>
);

export default Page;
