import { SlackIcon } from "components/icons";
import { ButtonLink } from "components/links";
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
    <ButtonLink inverted to={slackLink} {...other}>
      <>
        <SlackIcon /> <S.ButtonLabel>{slackText}</S.ButtonLabel>
      </>
    </ButtonLink>
  );
};

export default SlackButton;
