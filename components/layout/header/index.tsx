import { useState } from "react";
import Section from "../section";
import SectionContent from "../section-content";
import { ButtonAsLink, Link } from "components/links";
import { ButtonSize } from "components/buttons";
import { CloseIcon, MenuIcon } from "components/icons";
import { Links } from "components/common-links";
import * as S from "./styles";
import strings from "content/strings.json";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const Menu = [
    ["/projekty", strings.header.projects],
    ["/portal-dobrovolnika", strings.header.portal],
    ["/partners", strings.header.partners],
    ["https://blog.cesko.digital", "Blog"],
    [Links.supportUs, strings.header.supportUs],
  ];

  return (
    <Section as={"header"}>
      <SectionContent verticalPadding={0}>
        <S.Container>
          <Link to="/" size={ButtonSize.Small}>
            <S.Logo />
          </Link>

          <S.DesktopLinksContainer>
            {Menu.map(([link, label]) => (
              <Link key={label} to={link} size={ButtonSize.Small}>
                {label}
              </Link>
            ))}

            <S.HeaderButton to={Links.joinUs} size={ButtonSize.Normal} inverted>
              {strings.header.signUp}
            </S.HeaderButton>

            <Link key="english" to={"/en/"} size={ButtonSize.Small}>
              {strings.header.english}
            </Link>
          </S.DesktopLinksContainer>

          <S.MobileLinksContainer>
            <Link key="english" to={"/en/"} size={ButtonSize.Small}>
              {strings.header.english}
            </Link>
            <ButtonAsLink to={Links.joinUs} size={ButtonSize.Small} inverted>
              {strings.header.signUp}
            </ButtonAsLink>
            <S.IconButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </S.IconButton>
          </S.MobileLinksContainer>
        </S.Container>

        {mobileMenuOpen && (
          <S.MobileMenu>
            {Menu.map(([link, label]) => (
              <Link key={label} to={link} size={ButtonSize.Small}>
                {label}
              </Link>
            ))}
          </S.MobileMenu>
        )}
      </SectionContent>
    </Section>
  );
};

export default Header;
