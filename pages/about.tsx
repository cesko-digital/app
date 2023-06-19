import AboutPage from "app/about/_page";
import { Layout } from "components/layout";

const Page = () => (
  <Layout crumbs={[{ label: "O nás" }]} head={{ title: "O nás" }}>
    <AboutPage />
  </Layout>
);

export default Page;
