import { ButtonSize } from "components/buttons";
import ButtonAsLink from "components/links/button-as-link";
import * as S from "./styles";
import { Link } from "components/links";
import strings from "content/strings-en.json";

const Footer: React.FC = () => {
  const footer = strings.components.sections.footer;

  const o = footer.online;
  const socialLinks = [
    [o.facebook, "https://www.facebook.com/cesko.digital"],
    [o.twitter, "https://twitter.com/CeskoDigital"],
    [o.linkedin, "https://www.linkedin.com/company/cesko-digital"],
    [o.github, "https://github.com/cesko-digital"],
    [o.youtube, "https://www.youtube.com/channel/UCYMZxCNq_IWI8URpcx2sBwg"],
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
                  {socialLinks.map(([name, url], index) => (
                    <S.LinkItem key={index}>
                      <Link size={ButtonSize.Small} to={url}>
                        {name}
                      </Link>
                    </S.LinkItem>
                  ))}
                  <S.LinkItem key={socialLinks.length}>
                    <ButtonAsLink
                      size={ButtonSize.Small}
                      to={"mailto:pr@cesko.digital"}
                    >
                      {
                        strings.components.sections.footer.pageLinks
                          .mediaContact
                      }
                    </ButtonAsLink>
                  </S.LinkItem>
                </S.Links>
              </S.Navigation>
            </S.InfoBlock>
          </S.Info>
          <S.Note>{footer.footNote}</S.Note>
        </S.Container>
      </S.Outer>
    </S.Wrapper>
  );
};

export default Footer;
