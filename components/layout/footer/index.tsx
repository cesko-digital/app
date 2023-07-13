import NewsletterBox from "./newsletter-form";
import { Route } from "lib/routing";
import { Link } from "components/links";
import strings from "content/strings.json";
import * as S from "./styles";

const footerStrings = strings.components.sections.footer;

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
          <S.Note>{footerStrings.footNote}</S.Note>
        </S.Container>
      </S.Outer>
    </S.Wrapper>
  );
};

/** Important “internal” links such as project list, dashboard, etc. */
const InternalLinks = () => {
  const p = footerStrings.pageLinks;
  const pageLinks = [
    ["O nás", Route.aboutUs],
    [p.projects, Route.projects],
    [p.dashboard, Route.dashboard],
    [p.blog, Route.blog],
    [p.loginToSlack, Route.joinUs],
    [p.submitProject, Route.submitProject],
    [p.supportUs, Route.supportUs],
    [p.logo, Route.brandManual],
    [p.mediaContact, "mailto:pr@cesko.digital"],
    ["Pravidla chování", "/go/coc"],
  ];

  return (
    <S.InfoBlock>
      <S.Heading>{footerStrings.pageLinks.title}</S.Heading>
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
  const o = footerStrings.online;
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
      <S.Heading>{footerStrings.online.title}</S.Heading>
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
