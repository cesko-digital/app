import NewsletterBox from "./newsletter-form";
import { Route } from "lib/routing";
import { Link } from "components/links";
import * as S from "./styles";

const Footer = () => {
  return (
    <S.Wrapper>
      <S.Outer>
        <S.Container>
          <S.Info>
            <InternalLinks />
            <SocialLinks />
          </S.Info>
          <NewsletterBox />
          <S.Note>© Česko.Digital</S.Note>
        </S.Container>
      </S.Outer>
    </S.Wrapper>
  );
};

/** Important “internal” links such as project list, dashboard, etc. */
const InternalLinks = () => {
  const pageLinks = [
    ["O nás", Route.aboutUs],
    ["Co děláme", Route.projects],
    ["Příležitosti k zapojení", Route.dashboard],
    ["Blog", Route.blog],
    ["Přidej se k nám", Route.joinUs],
    ["Zadat projekt", Route.submitProject],
    ["Podpoř nás", Route.supportUs],
    ["Logo", Route.brandManual],
    ["Kontakt pro média", "mailto:pr@cesko.digital"],
    ["Pravidla chování", "/go/coc"],
  ];

  return (
    <S.InfoBlock>
      <S.Heading>Česko.Digital</S.Heading>
      <S.Navigation>
        <S.Links>
          {pageLinks.map(([name, url], i) => (
            <S.LinkItem key={i}>
              <Link variant="smallLight" to={url}>
                {name}
              </Link>
            </S.LinkItem>
          ))}
        </S.Links>
      </S.Navigation>
    </S.InfoBlock>
  );
};

/** Links to our profiles on social networks */
const SocialLinks = () => {
  const socialLinks = [
    ["Facebook", "https://www.facebook.com/cesko.digital"],
    ["Mastodon", "https://mastodon.cesko.digital/@ceskodigital"],
    ["X", "https://twitter.com/CeskoDigital"],
    ["LinkedIn", "https://www.linkedin.com/company/cesko-digital"],
    ["Instagram", "https://www.instagram.com/cesko.digital/"],
    ["YouTube", "https://www.youtube.com/c/ČeskoDigital"],
    ["Podcast", "https://anchor.fm/poslouchatdigital"],
    ["GitHub", "https://github.com/cesko-digital"],
  ];

  return (
    <S.InfoBlock>
      <S.Heading>Sledujte nás</S.Heading>
      <S.Navigation>
        <S.Links>
          {socialLinks.map(([name, url], index) => (
            <S.LinkItem key={index}>
              <Link variant="smallLight" to={url} openInNewTab>
                {name}
              </Link>
            </S.LinkItem>
          ))}
        </S.Links>
      </S.Navigation>
    </S.InfoBlock>
  );
};

export default Footer;
