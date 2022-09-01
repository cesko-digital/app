import * as S from "./styles";
import strings from "content/strings.json";
import { PortalUser } from "lib/airtable/user";

interface GarantProps {
  user: PortalUser;
}

const Garant: React.FC<GarantProps> = ({ user }) => {
  return (
    <S.OuterWrapper>
      <S.Title>{strings.components.cards.eventCard.contact}</S.Title>
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
