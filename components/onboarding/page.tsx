import { Field } from "lib/airtable/skills";
import OnboardingForm, { RegistrationData } from "./form";
import { ThemeContext } from "styled-components";
import { useContext } from "react";
import { Layout, Section, SectionContent } from "components/layout";
import * as S from "components/onboarding/styles";

interface Props {
  skills: readonly Field[];
  onSubmit: (data: RegistrationData) => Promise<boolean>;
}

const OnboardingPage: React.FC<Props> = ({ skills, onSubmit }) => {
  const theme = useContext(ThemeContext);
  return (
    <Layout
      crumbs={[
        { label: "Zapojit se", path: "/join" },
        { label: "Registrační formulář" },
      ]}
      head={{
        title: "Staň se členem komunity",
        description: `Staň se součástí Česko.Digital, největší komunity expertních dobrovolníků
            a dobrovolnic. Rádi tě zapojíme do projektů, které tě budou bavit a kde můžeš získat
            nové zkušenosti nebo se podělit o své nápady.`,
      }}
    >
      <Section>
        <S.SectionIntroductionContent>
          <S.IntroductionHeader>
            <S.H1>Staň se členem komunity</S.H1>
            <S.BodyBig>
              Abychom věděli, co by tě z našich aktivit mohlo zajímat a kdo se
              na tebe může z komunity obrátit, řekni nám prosím něco o sobě.
              Osobní údaje a dovednostní preference si pak budeš moci kdykoliv
              upravit ve svém profilu na portálu dobrovolníka.
            </S.BodyBig>
            <S.Body color={"darkGrey"}>
              Po odeslání formuláře se dostaneš na náš Slack, ve kterém probíhá
              veškerá komunikace o projektech a mezi členy komunity. Tam tě také
              hned přivítá robot, který ti pomůže s orientací v komunitních
              kanálech a předá ti další důležité informace.
            </S.Body>
            <S.Body color={"darkGrey"}>
              Odesláním formuláře souhlasíš s našimi{" "}
              <a href="https://docs.google.com/document/d/e/2PACX-1vQ3cVnhGyzIsyDx0gyx3uPJharkhhfQOXHcgCI3swVZaDd0sXhmX74E1IVEtItWvA2H_dQqGTkxeR2q/pub">
                podmínkami zpracování osobních údajů
              </a>{" "}
              a zasíláním měsíčního newsletteru.
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
