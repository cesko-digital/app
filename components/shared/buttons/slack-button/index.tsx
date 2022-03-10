import { SlackIcon } from "components/shared/icons";
import ButtonAsLink from "components/shared/button-as-link";
import * as S from "./styles";

export interface SlackButtonProps {
  slackLink: string;
  slackText: string;
}

const SlackButton: React.FC<SlackButtonProps> = ({
  slackLink,
  slackText,
  ...other
}) => {
  return (
    <ButtonAsLink inverted to={slackLink} {...other}>
      <>
        <SlackIcon /> <S.ButtonLabel>{slackText}</S.ButtonLabel>
      </>
    </ButtonAsLink>
  );
};

export default SlackButton;
