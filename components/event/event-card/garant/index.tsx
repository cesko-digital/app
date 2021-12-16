import { PortalUser } from "lib/portal-types";
import * as S from "./styles";

interface GarantProps {
  user: PortalUser;
}

const Garant: React.FC<GarantProps> = ({ user }) => {
  return (
    <S.OuterWrapper>
      <S.Title>Kontakt</S.Title>
      <S.Wrapper>
        <S.Avatar src={user.profilePictureUrl} />
        <S.AvatarTitleWrapper>
          <S.AvatarTitle>
            <S.ContactLink href={`mailto:${user.email}`}>
              {user.name}
            </S.ContactLink>
          </S.AvatarTitle>
        </S.AvatarTitleWrapper>
      </S.Wrapper>
    </S.OuterWrapper>
  );
};

export default Garant;
