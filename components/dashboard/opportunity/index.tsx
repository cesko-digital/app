import { isOwnerEmailDisplayed } from "lib/utils";

import { BodySmall } from "components/typography";

import * as S from "./styles";

interface Props {
  email?: string,
  name: string,
}

const OwnerContact: React.FC<Props> = ({ email, name }) => {
  if (email && email.length > 0 && isOwnerEmailDisplayed(email)) {
    return (
      <div>
        <S.OwnerName>{name}</S.OwnerName>
        <BodySmall>
          <S.OwnerMailto to={'mailto:'+email}>{email}</S.OwnerMailto>
        </BodySmall>
      </div>
    );
  } else {
    return (
      <div>
        <S.OwnerName>{name}</S.OwnerName>
      </div>
    );
  }
};

export default OwnerContact;
