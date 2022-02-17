import Script from 'next/script'

import strings from "content/strings.json";

import RenderMarkdown from "components/markdown";
import { MarkdownString } from "lib/utils";

import * as S from "./styles";

interface Props {
  message?: string;
}

const Banner: React.FC<Props> = ({ message, ...rest }) => {
  const msg = message ?? strings.banner.message;
  const src = {source: msg} as MarkdownString;

  return (
    <S.Section>
      <S.Container>
        <S.Content>
          <RenderMarkdown source={src} />
          
          <div data-darujme-widget-token="r8khm5srq8edhpon">&nbsp;</div>
          <Script src="/darujme-widget.js"></Script>
        </S.Content>
      </S.Container>
    </S.Section>
  );
};

export default Banner;
