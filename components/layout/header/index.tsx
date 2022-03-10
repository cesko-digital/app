import { useState } from "react";
import Section from "../section";
import SectionContent from "../section-content";
import ButtonAsLink from "components/shared/button-as-link";
import Link from "components/shared/link";
import { ButtonSize } from "components/shared/buttons";
import { CloseIcon, MenuIcon } from "components/shared/icons";
import { Route } from "lib/routing";
import * as S from "./styles";
import strings from "content/strings.json";

const HeaderCS: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menu = [
    [Route.projects, strings.header.projects],
    [Route.dashboard, strings.header.dashboard],
    [Route.partners, strings.header.partners],
    [Route.blog, "Blog"],
    [Route.supportUs, strings.header.supportUs],
  ];

  return (
    <Section as={"header"}>
      <SectionContent verticalPadding={0}>
        <S.Container>
          <Link to="/" size={ButtonSize.Small}>
            <S.Logo />
          </Link>

          <S.DesktopLinksContainer>
            {menu.map(([link, label]) => (
              <Link key={label} to={link} size={ButtonSize.Small}>
                {label}
              </Link>
            ))}

            <S.HeaderButton to={Route.joinUs} size={ButtonSize.Normal} inverted>
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
            <ButtonAsLink to={Route.joinUs} size={ButtonSize.Small} inverted>
              {strings.header.signUp}
            </ButtonAsLink>
            <S.IconButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </S.IconButton>
          </S.MobileLinksContainer>
        </S.Container>

        {mobileMenuOpen && (
          <S.MobileMenu>
            {menu.map(([link, label]) => (
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

export default HeaderCS;
