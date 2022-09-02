import * as S from "./styles";
import { Link } from "components/links";
import { PortalVideo } from "lib/data-sources/cedu";
import strings from "content/strings.json";
import { Route } from "lib/utils";

interface Props {
  video: PortalVideo;
}

const CeduCard: React.FC<Props> = ({ video, ...rest }) => {
  return (
    <S.Card {...rest}>
      <S.Header>
        <S.Cover
          url={video.cover}
          aria-label={`${strings.cards.project.coverAriaLabel} ${video.title}`}
        />
        <S.CoverWrap />
        <S.Logo
          url="https://data.cesko.digital/web/projects/cesko-digital/logo.png"
          aria-label={`${strings.cards.project.logoAriaLabel} ${video.title}`}
        />
      </S.Header>
      <S.Content>
        <S.Title>{video.title}</S.Title>
        <S.TagList>
          {video.tags.map((tag) => (
            <S.Tag key={tag}>#{tag}</S.Tag>
          ))}
        </S.TagList>
        <S.Description>{video.description}</S.Description>
        <Link to={Route.toVideo(video)}>
          {strings.components.cards.ceduCard.interested}
        </Link>
      </S.Content>
    </S.Card>
  );
};

export default CeduCard;
