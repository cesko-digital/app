import HeaderCS from "./header";
import Footer from "./footer";
import Section from "./section";
import SectionContent from "./section-content";
import Breadcrumb, { Crumb } from "./breadcrumb";
import * as S from "./styles";
import CustomHead, { CustomHeadProps } from "./head";
import HeaderEN from "./header/english";
import Banner from "components/banner";
import Script from "next/script";

export interface Props {
  crumbs?: Crumb[];
  head?: CustomHeadProps;
  lang?: "cs" | "en";
  showBanner?: boolean;
}

const Layout: React.FC<Props> = ({
  crumbs,
  children,
  head: seo = {},
  lang = "cs",
  showBanner,
}) => {
  return (
    <S.Container>
      <Script
        data-domain="cesko.digital"
        src="https://plausible.io/js/plausible.js"
      />
      <Script src="https://www.googletagmanager.com/gtag/js?id=UA-140227366-1" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-140227366-1', { client_storage: 'none', anonymize_ip: true });
      `}
      </Script>
      <CustomHead {...seo} />
      {showBanner && <Banner />}
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
