import { ReactNode } from "react";
import HeaderCS from "./header";
import Footer from "./footer";
import Section from "./section";
import SectionContent from "./section-content";
import Breadcrumb, { Crumb } from "./breadcrumb";
import * as S from "./styles";
import CustomHead, { CustomHeadProps } from "./head";
import HeaderEN from "./header/english";

export interface Props {
  crumbs?: Crumb[];
  children: ReactNode;
  head?: CustomHeadProps;
  lang?: "cs" | "en";
}

const Layout: React.FC<Props> = ({
  crumbs,
  children,
  head: seo = {},
  lang = "cs",
}: Props) => {
  return (
    <S.Container>
      <CustomHead {...seo} />
      {lang === "cs" && <HeaderCS />}
      {lang === "en" && <HeaderEN />}
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
