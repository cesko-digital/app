import strings from "content/strings.json";
import { TeamEngagement } from "lib/airtable/team-engagement";
import * as S from "./styles";

interface Props {
  coordinators: readonly TeamEngagement[];
}

const Coordinators: React.FC<Props> = ({ coordinators }) => {
  const msg = strings.pages.project.projectCard;
  return (
    <S.Wrapper>
      <S.Title>{msg.coordinators}</S.Title>
      {coordinators.map((engagement, index) => (
        <S.Container key={index}>
          <S.Image url={engagement.userAvatarUrl} />
          <S.Text>
            <S.Name>{engagement.userName}</S.Name>
          </S.Text>
        </S.Container>
      ))}
    </S.Wrapper>
  );
};

export default Coordinators;
