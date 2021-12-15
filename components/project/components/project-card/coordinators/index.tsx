import { PortalUser } from "lib/portal-types";
import strings from "content/strings.json";
import * as S from "./styles";

interface Props {
  coordinators: PortalUser[];
}

const Coordinators: React.FC<Props> = ({ coordinators }) => {
  const msg = strings.pages.project.projectCard;
  return (
    <S.Wrapper>
      <S.Title>{msg.coordinators}</S.Title>
      {coordinators.map(({ profilePictureUrl, name }, index) => (
        <S.Container key={index}>
          {profilePictureUrl && <S.Image url={profilePictureUrl} />}
          <S.Text>
            <S.Name>{name}</S.Name>
          </S.Text>
        </S.Container>
      ))}
    </S.Wrapper>
  );
};

export default Coordinators;
