import Header from "./header";
import Footer from "./footer";
import Section from "./section";
import SectionContent from "./section-content";
import Breadcrumb, { Crumb } from "./breadcrumb";
import * as S from "./styles";
import CustomHead, { CustomHeadProps } from "./head";
import Banner from "components/banner";
import Script from "next/script";
import { analyticsId } from "lib/utils";

export interface Props {
  crumbs?: Crumb[];
  head?: CustomHeadProps;
  showBanner?: boolean;
}

const Layout: React.FC<Props> = ({
  crumbs,
  children,
  head: seo = {},
  showBanner,
}) => {
  return (
    <S.Container>
      <Script
        data-domain="cesko.digital"
        src="https://plausible.io/js/plausible.js"
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${analyticsId}', { client_storage: 'none', anonymize_ip: true });
      `}
      </Script>
      <Script
        type="text/javascript"
        src="https://cdn.weglot.com/weglot.min.js"
        strategy="beforeInteractive"
      />
      <Script id="weglot">
        {`Weglot.initialize({
          api_key: '${process.env.NEXT_PUBLIC_WEGLOT_API_KEY}'
        });`}
      </Script>
      <CustomHead {...seo} />
      {showBanner && <Banner />}
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
