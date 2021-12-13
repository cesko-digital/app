import { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";
import Section from "./section";
import SectionContent from "./section-content";
import Breadcrumb, { Crumb } from "./breadcrumb";
import * as S from "./styles";
import Seo, { SeoProps } from "./seo";

export interface LayoutProps {
  crumbs?: Crumb[];
  children: ReactNode;
  seo?: SeoProps;
}

const Layout: React.FC<LayoutProps> = ({
  crumbs,
  children,
  seo = {},
}: LayoutProps) => {
  return (
    <S.Container>
      <Seo {...seo} />
      <Header />
      {crumbs && (
        <Section>
          <SectionContent>
            <Breadcrumb crumbs={crumbs} />
          </SectionContent>
        </Section>
      )}
      <main>{children}</main>
      <Footer />
    </S.Container>
  );
};

export default Layout;
