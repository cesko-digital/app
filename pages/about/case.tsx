import { Layout } from "components/layout";
import CasePage from "app/about/case/_page";

const Page = () => (
  <Layout crumbs={[{ label: "O nás" }]} head={{ title: "Case for Support" }}>
    <CasePage />
  </Layout>
);

export default Page;
