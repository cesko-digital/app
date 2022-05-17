import { ButtonSize } from "components/buttons";
import NewsletterBox from "./newsletter-form";
import * as S from "./styles";
import { Route } from "lib/routing";
import { Link } from "components/links";
import strings from "content/strings.json";
import { useSession, signIn, signOut } from "next-auth/react";

const Footer: React.FC = () => {
  const footer = strings.components.sections.footer;

  const o = footer.online;
  const socialLinks = [
    [o.facebook, "https://www.facebook.com/cesko.digital"],
    [o.twitter, "https://twitter.com/CeskoDigital"],
    [o.linkedin, "https://www.linkedin.com/company/cesko-digital"],
    [o.instagram, "https://www.instagram.com/cesko.digital/"],
    [o.youtube, "https://www.youtube.com/channel/UCYMZxCNq_IWI8URpcx2sBwg"],
    [o.podcast, "https://anchor.fm/poslouchatdigital"],
    [o.github, "https://github.com/cesko-digital"],
    [o.cocuma, "https://www.cocuma.cz/company/cesko-digital/jobs/"],
  ];

  const p = footer.pageLinks;
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
    <S.Wrapper>
      <S.Outer>
        <S.Container>
          <S.Info>
            <S.InfoBlock>
              <S.Heading>{footer.pageLinks.title}</S.Heading>
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
            <S.InfoBlock>
              <S.Heading>{footer.online.title}</S.Heading>
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
          </S.Info>
          <NewsletterBox />
          <S.Note>
            {footer.footNote} • <SessionInfo />
          </S.Note>
        </S.Container>
      </S.Outer>
    </S.Wrapper>
  );
};

const SessionInfo: React.FC = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <>
        Přihlášen jako {session.user.email} •{" "}
        <ClickableLink onClick={() => signOut()}>Odhlásit</ClickableLink>
      </>
    );
  }
  return (
    <>
      <ClickableLink onClick={() => signIn("slack")}>
        Přihlásit přes Slack
      </ClickableLink>
    </>
  );
};

const ClickableLink: React.FC<{ onClick: () => void }> = (props) => (
  <a onClick={props.onClick} style={{ cursor: "pointer" }}>
    {props.children}
  </a>
);

export default Footer;
