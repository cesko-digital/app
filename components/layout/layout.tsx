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
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer', 'GTM-PRMTS8P');
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
