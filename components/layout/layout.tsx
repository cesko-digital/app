import Header from "./header";
import Footer from "./footer";
import Section from "./section";
import SectionContent from "./section-content";
import Breadcrumb, { Crumb } from "./breadcrumb";
import * as S from "./styles";
import CustomHead, { CustomHeadProps } from "./head";
import Script from "next/script";
import { useContext } from "react";
import { LangContext } from "components/language";

export interface Props {
  crumbs?: Crumb[];
  head?: CustomHeadProps;
  children: React.ReactNode;
}

const Layout = ({ crumbs, children, head: seo = {} }: Props) => {
  const lang = useContext(LangContext);
  return (
    <S.Container>
      <Script
        data-domain="cesko.digital"
        src="https://plausible.io/js/script.outbound-links.js"
      />
      <CustomHead {...seo} />
      {lang === "en" && <TranslationNotice />}
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

const TranslationNotice = () => (
  <div className="bg-pebble py-2 px-4 text-center text-gray-500 leading-relaxed text-sm">
    🇬🇧 The English version was translated from Czech by a robot. If the robot
    didn’t do a good job somewhere,{" "}
    <a
      href="mailto:hello@cesko.digital?subject=Website localization"
      className="text-inherit"
    >
      please let us know
    </a>
    .
  </div>
);

export default Layout;
