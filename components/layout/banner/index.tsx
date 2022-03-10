import Script from "next/script";

import strings from "content/strings.json";

import RenderMarkdown from "components/shared/markdown";
import { MarkdownString } from "lib/utils";

import * as S from "./styles";

interface Props {
  message?: string;
}

const Banner: React.FC<Props> = ({ message }) => {
  const msg = message ?? strings.banner.message;
  const src = { source: msg } as MarkdownString;

  return (
    <S.Section>
      <S.Container>
        <S.Content>
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
        </S.Content>
      </S.Container>
    </S.Section>
  );
};

export default Banner;
