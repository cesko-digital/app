import Script from "next/script";
import strings from "content/strings.json";
import RenderMarkdown from "components/markdown";
import { MarkdownString } from "lib/utils";

interface Props {
  message?: string;
}

/** A full-width fundraising banner with the Darujme.cz widget */
const Banner: React.FC<Props> = ({ message }) => {
  const msg = message ?? strings.banner.message;
  const src = { source: msg } as MarkdownString;

  return (
    <Section>
      <Container>
        <Content>
          <RenderMarkdown source={src} />
          <div data-darujme-widget-token="r8khm5srq8edhpon">&nbsp;</div>
          <Script id="darujme-widget">
            {`+function(w, d, s, u, a, b) {
              w['DarujmeObject'] = u;
              w[u] = w[u] || function () { (w[u].q = w[u].q || []).push(arguments) };
              a = d.createElement(s); b = d.getElementsByTagName(s)[0];
              a.async = 1; a.src = "https:\/\/www.darujme.cz\/assets\/scripts\/widget.js";
              b.parentNode.insertBefore(a, b);
            }(window, document, 'script', 'Darujme');
            Darujme(1, "r8khm5srq8edhpon", 'render', "https:\/\/www.darujme.cz\/widget?token=r8khm5srq8edhpon", "100%");
            `}
          </Script>
        </Content>
      </Container>
    </Section>
  );
};

const Section: React.FC = ({ children }) => (
  <section className="text-white bg-[#080831] mb-0 lg:mb-5 min-h-[200px]">
    {children}
  </section>
);

const Container: React.FC = ({ children }) => (
  <div className="max-w-content px-5 py-5 lg:py-10 m-auto relative">
    {children}
  </div>
);

const Content: React.FC = ({ children }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative w-full">
    {children}
  </div>
);

export default Banner;
