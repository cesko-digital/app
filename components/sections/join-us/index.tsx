import { NewProject, PanelVolunteer } from "components/cards";
import * as S from "./styles";
import { Heading2 } from "components/typography";

const JoinUs: React.FC = () => (
  <S.Container>
    <Heading2>Přidejte se</Heading2>
    <S.CircleCover />
    <S.Card>
      <PanelVolunteer />
      <NewProject />
    </S.Card>
  </S.Container>
);

export default JoinUs;
