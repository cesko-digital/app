import { useContext, useState } from "react";
import Section from "../section";
import SectionContent from "../section-content";
import { Link } from "components/links";
import { ButtonSize } from "components/buttons";
import { CloseIcon, MenuIcon } from "components/icons";
import { doNotTranslate, Route } from "lib/utils";
import { useSession, signIn } from "next-auth/react";
import { DefaultSession } from "next-auth";
import * as S from "./styles";
import strings from "content/strings.json";
import Plausible from "plausible-tracker";
import { default as NextLink } from "next/link";
import { LangContext } from "components/language";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lang = useContext(LangContext);

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
          <Link to="/" variant="smallDark">
            <S.Logo />
          </Link>

          <S.DesktopLinksContainer>
            {menu.map(([link, label]) => (
              <Link key={label} to={link} variant="smallDark">
                {label}
              </Link>
            ))}
            {lang === "cs" && <ManageSession />}
            <LanguageSwitcher />
          </S.DesktopLinksContainer>

          <S.MobileLinksContainer>
            <LanguageSwitcher />
            {lang === "cs" && <ManageSession />}
            <S.IconButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </S.IconButton>
          </S.MobileLinksContainer>
        </S.Container>

        {mobileMenuOpen && (
          <S.MobileMenu>
            {menu.map(([link, label]) => (
              <S.MobileMenuItem key={label}>
                <Link to={link} variant="smallDark">
                  {label}
                </Link>
              </S.MobileMenuItem>
            ))}
          </S.MobileMenu>
        )}
      </SectionContent>
    </Section>
  );
};

const LanguageSwitcher = () => {
  const currentLang = useContext(LangContext);
  const { asPath: path } = useRouter();
  return (
    <>
      {currentLang === "cs" && (
        <Link
          key="english"
          to={Route.english(path)}
          variant="smallDark"
          className={doNotTranslate}
        >
          English
        </Link>
      )}
      {currentLang === "en" && (
        <Link
          key="czech"
          to={Route.czech(path)}
          variant="smallDark"
          className={doNotTranslate}
        >
          Česky
        </Link>
      )}
    </>
  );
};

const ManageSession = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    return <UserProfileButton user={session.user} />;
  } else {
    return <SignInButton />;
  }
};

const SignInButton = () => {
  const { trackEvent } = Plausible({ domain: "cesko.digital" });
  const handleClick = () => {
    trackEvent("SignIn");
    signIn("slack");
  };
  return (
    <S.HeaderButton size={ButtonSize.Small} onClick={handleClick} inverted>
      Přihlásit se
    </S.HeaderButton>
  );
};

const UserProfileButton: React.FC<{
  user: NonNullable<DefaultSession["user"]>;
}> = ({ user }) => {
  const imageUrl =
    user.image || "https://data.cesko.digital/people/generic-profile.jpg";
  const email = user.email || "<neznámý e-mail>";
  return (
    <NextLink href={Route.profile}>
      {/* eslint-disable @next/next/no-img-element */}
      <img
        src={imageUrl}
        title={`Přihlášen jako ${email}`}
        alt=""
        style={{
          height: "44px",
          width: "44px",
          borderRadius: "44px",
          border: "2px solid #ddd",
          boxShadow: "0 6px 16px rgba(0,0,0,0.08),0 1px 2px rgba(8,8,49,0.12)",
        }}
      />
    </NextLink>
  );
};

export default Header;
