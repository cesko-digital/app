import * as S from "./styles";
import { Route } from "lib/utils";
import { getResizedImgUrl } from "lib/utils";
import strings from "content/strings.json";

const PanelVolunteer: React.FC = () => {
  const msg = strings.components.cards.panelVolunteer;
  return (
    <S.Wrapper>
      <S.Cover>
        <S.Image
          url={getResizedImgUrl(
            "https://data.cesko.digital/web/sections/join-us/cover.jpg",
            769
          )}
        />
      </S.Cover>
      <S.Content>
        <S.Title>{msg.title}</S.Title>
        <S.Description>{msg.description}</S.Description>
        <S.SlackButtonElement
          slackLink={Route.joinUs}
          slackText={msg.linkText}
        />
      </S.Content>
    </S.Wrapper>
  );
};

export default PanelVolunteer;
