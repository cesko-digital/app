import strings from "content/strings.json";
import { TeamEngagement } from "lib/airtable/team-engagement";
import * as S from "./styles";

interface Props {
  coordinators: readonly TeamEngagement[];
}

const Coordinators: React.FC<Props> = ({ coordinators }) => {
  const msg = strings.pages.project.projectCard;
  const engagements = [...coordinators].sort((a, b) => {
    // Sort inactive engagements last
    if (a.inactive && !b.inactive) {
      return +1;
    } else if (b.inactive && !a.inactive) {
      return -1;
    } else {
      return 0;
    }
  });
  return (
    <S.Wrapper>
      <S.Title>{msg.coordinators}</S.Title>
      {engagements.map((engagement) => (
        <S.Container
          key={engagement.userName}
          className={engagement.inactive ? "opacity-40" : ""}
        >
          <S.Image url={engagement.userAvatarUrl} />
          <S.Text>
            <S.Name className={"no_translate"}>{engagement.userName}</S.Name>
          </S.Text>
        </S.Container>
      ))}
    </S.Wrapper>
  );
};

export default Coordinators;
