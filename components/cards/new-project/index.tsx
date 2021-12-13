import * as S from "./styles";
import { BulbIcon } from "components/icons";
import { Links } from "components/common-links";
import strings from "content/strings.json";

const NewProject: React.FC = () => {
  const msg = strings.components.cards.newProject;
  return (
    <S.Wrapper>
      <div>
        <BulbIcon />
        <S.Title>{msg.title}</S.Title>
      </div>
      <S.Description>{msg.description}</S.Description>
      <S.ButtonWrapper>
        <S.ButtonAsLinkElement to={Links.submitProject}>
          {msg.linkText}
        </S.ButtonAsLinkElement>
      </S.ButtonWrapper>
    </S.Wrapper>
  );
};

export default NewProject;
