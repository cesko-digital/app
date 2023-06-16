import { Layout } from "components/layout";
import CasePage from "app/about/case/_page";

/**
 * The “Case for Support” page
 *
 * We try to keep most of the new code in the `app` router, but still use the `page` router
 * for compatibility reasons – so the entry point is here, but all of the code and assets are
 * stored in the `app` folder.
 */
const Page = () => (
  <Layout crumbs={[{ label: "O nás" }]} head={{ title: "Case for Support" }}>
    <CasePage />
  </Layout>
);

export default Page;
