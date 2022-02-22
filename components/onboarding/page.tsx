import { Field } from "lib/skills";
import OnboardingForm, { RegistrationData } from "./form";
import { ThemeContext } from "styled-components";
import { useContext } from "react";
import { Layout, Section, SectionContent } from "components/layout";
import * as S from "components/onboarding/styles";

interface Props {
  skills: Field[];
  onSubmit: (data: RegistrationData) => Promise<boolean>;
}

const OnboardingPage: React.FC<Props> = ({ skills, onSubmit }) => {
  const theme = useContext(ThemeContext);
  return (
    <Layout
      crumbs={[{ label: "Přidej se k nám!" }]}
      head={{
        title: "Přidej se k nám!",
        description: `Staň se součástí Česko.Digital, největší komunity expertních dobrovolníků
            a dobrovolnic. Rádi tě zapojíme do projektů, které tě budou bavit a kde můžeš získat
            nové zkušenosti nebo se podělit o své nápady.`,
      }}
    >
      <Section>
        <S.SectionIntroductionContent>
          <S.IntroductionHeader>
            <S.H1>Přidej se k nám!</S.H1>
            <S.BodyBig>
              Staň se součástí Česko.Digital, největší komunity expertních
              dobrovolníků a dobrovolnic. Rádi tě zapojíme do projektů, které tě
              budou bavit a kde můžeš získat nové zkušenosti nebo se podělit o
              své nápady.
            </S.BodyBig>
            <S.Body color={"darkGrey"}>
              <S.Highlighted>
                Začni prosím tím, že vyplníš následující registrační formulář.
              </S.Highlighted>{" "}
              Vyplněná data neprezentujeme veřejně, ale lépe tě díky nim poznáme
              a uděláme si představu o tom, jaké projekty by tě mohly zajímat a
              kde bychom tě potřebovali.
            </S.Body>
            <S.Body color={"darkGrey"}>
              Po odeslání formuláře se dostaneš na náš Slack, ve kterém probíhá
              veškerá komunikace o projektech a mezi členy komunity. Tam tě také
              hned přivítá robot, který ti pomůže s orientací v komunitních
              kanálech a předá ti další důležité informace.
            </S.Body>
          </S.IntroductionHeader>
        </S.SectionIntroductionContent>
      </Section>

      <Section backgroundColor={theme.colors.pebble}>
        <SectionContent verticalPadding={40}>
          <OnboardingForm skills={skills} onSubmit={onSubmit} />
        </SectionContent>
      </Section>
    </Layout>
  );
};

export default OnboardingPage;
