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

            <div style={{background: "#F9F9F9", padding: "0.5em 1.5em", borderRadius: "8px", lineHeight: "150%"}}>
            <p><strong>👉🏻 Pozor, pozor, testujeme nápady a potřebujeme tvoji pomoc!</strong></p>
            <p>Zrovna <S.Highlighted>pracujeme na vylepšení procesu zapojení nováčků do komunity</S.Highlighted>. Místo toho, aby ses teď registroval/a, můžeš nám pomoct zjistit, jestli jsme s novým řešením na správné cestě.</p> 
            <p>Stačí nám <b style={{fontWeight: 600}}>hodina tvého času ve čtvrtek 21. července</b>. Testování bude probíhat online. Tak si jen vyber preferovaný čas, přidej kontakt na sebe a my se ti ozveme zpět s detaily.</p>
            <p>Přihlásit k testování se můžeš <a href="https://airtable.com/shrZtQxPYwgqQIdpX">přímo tady</a>.</p>
            </div>

            <S.Body color={"darkGrey"}>
              Pokud se chceš registrovat nyní, začni prosím tím, že vyplníš následující formulář.
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
