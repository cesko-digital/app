import * as S from "./styles";

interface Props {
  email: string,
  name: string,
}

const OwnerContact: React.FC<Props> = ({ email, name }) => {
  if (email.length > 0) {
    return (
      <S.OwnerName><S.OwnerMailto to={'mailto:'+email}>{name}</S.OwnerMailto></S.OwnerName>
    );
  } else {
    return (
      <S.OwnerName>{name}</S.OwnerName>
    );
  }
};

export default OwnerContact;
