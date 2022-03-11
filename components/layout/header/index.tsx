import { useState } from "react";
import Section from "../section";
import SectionContent from "../section-content";
import { Link } from "components/links";
import { ButtonSize } from "components/buttons";
import { CloseIcon, MenuIcon } from "components/icons";
import { Route } from "lib/routing";
import { useSession, signIn, signOut } from "next-auth/react";
import * as S from "./styles";
import strings from "content/strings.json";
import { StyledLink } from "components/links/link/styles";

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

            <ManageSession />

            <Link key="english" to={"/en/"} size={ButtonSize.Small}>
              {strings.header.english}
            </Link>
          </S.DesktopLinksContainer>

          <S.MobileLinksContainer>
            <Link key="english" to={"/en/"} size={ButtonSize.Small}>
              {strings.header.english}
            </Link>
            <ManageSession />
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

const ManageSession = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    return <UserProfileButton />;
  } else {
    return <SignInButton />;
  }
};

const SignInButton = () => {
  return (
    <S.HeaderButton
      size={ButtonSize.Small}
      onClick={() => signIn("slack")}
      inverted
    >
      Přihlásit
    </S.HeaderButton>
  );
};

const UserProfileButton = () => {
  return (
    <StyledLink size={ButtonSize.Small} onClick={() => signOut()}>
      Odhlásit
    </StyledLink>
  );
};

export default HeaderCS;
