import { ButtonSize } from "components/buttons";
import NewsletterBox from "./newsletter-form";
import { Route } from "lib/utils";
import { Link } from "components/links";
import { default as stringsCS } from "content/strings.json";
import { default as stringsEN } from "content/strings-en.json";
import * as S from "./styles";

type Lang = "cs" | "en";

type Props = {
  lang?: Lang;
};

const strings = {
  cs: stringsCS.components.sections.footer,
  en: stringsEN.components.sections.footer,
};

const Footer: React.FC<Props> = ({ lang = "cs" }) => {
  return (
    <S.Wrapper>
      <S.Outer>
        <S.Container>
          <S.Info>
            {lang === "cs" && <InternalLinks />}
            <SocialLinks lang={lang} />
          </S.Info>
          {lang === "cs" && <NewsletterBox />}
          <S.Note>{strings[lang].footNote}</S.Note>
        </S.Container>
      </S.Outer>
    </S.Wrapper>
  );
};

/** Important “internal” links such as project list, dashboard, etc.; Czech only */
const InternalLinks = () => {
  const p = strings.cs.pageLinks;
  const pageLinks = [
    [p.projects, Route.projects],
    [p.dashboard, Route.dashboard],
    [p.blog, Route.blog],
    [p.loginToSlack, Route.joinUs],
    [p.submitProject, Route.submitProject],
    [p.supportUs, Route.supportUs],
    [p.logo, Route.brandManual],
    [p.mediaContact, "mailto:pr@cesko.digital"],
  ];

  return (
    <S.InfoBlock>
      <S.Heading>{strings.cs.pageLinks.title}</S.Heading>
      <S.Navigation>
        <S.Links>
          {pageLinks.map(([name, url], i) => (
            <S.LinkItem key={i}>
              <Link size={ButtonSize.Small} to={url}>
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
const SocialLinks: React.FC<Props> = ({ lang = "cs" }) => {
  const o = strings[lang].online;
  const socialLinks = [
    [o.facebook, "https://www.facebook.com/cesko.digital"],
    [o.twitter, "https://twitter.com/CeskoDigital"],
    [o.linkedin, "https://www.linkedin.com/company/cesko-digital"],
    [o.instagram, "https://www.instagram.com/cesko.digital/"],
    [o.youtube, "https://www.youtube.com/c/ČeskoDigital"],
    [o.podcast, "https://anchor.fm/poslouchatdigital"],
    [o.github, "https://github.com/cesko-digital"],
    [o.cocuma, "https://www.cocuma.cz/company/cesko-digital/jobs/"],
  ];

  return (
    <S.InfoBlock>
      <S.Heading>{strings[lang].online.title}</S.Heading>
      <S.Navigation>
        <S.Links>
          {socialLinks.map(([name, url], index) => (
            <S.LinkItem key={index}>
              <Link size={ButtonSize.Small} to={url} openInNewTab>
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
