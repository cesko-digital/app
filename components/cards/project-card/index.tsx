import * as S from "./styles";
import { Link } from "components/links";
import { getResizedImgUrl } from "lib/utils";
import strings from "content/strings.json";

interface ProjectCardProps {
  title: string;
  description: string;
  cover: string;
  logo: string;
  link: string;
  tags: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = (props) => {
  const { title, description, cover, logo, link, tags, ...rest } = props;
  const msg = strings.cards.project;
  return (
    <S.Card {...rest}>
      <S.Header>
        <S.Cover
          url={getResizedImgUrl(cover, 758)} // why is this number here (758), it is the largest width I was able to find with all window sizes - and since I do not want to repeat the CSS logic here, I took the largest
          aria-label={`${msg.coverAriaLabel} ${title}`}
        />
        <S.Logo
          url={getResizedImgUrl(logo, 82)}
          aria-label={`${msg.coverAriaLabel} ${title}`}
        />
      </S.Header>
      <S.Content>
        <S.Title>{title}</S.Title>
        <S.TagList>
          {tags.map((tag) => (
            <S.Tag key={tag}>#{tag}</S.Tag>
          ))}
        </S.TagList>
        <S.Description>{description}</S.Description>
        <Link to={link}>{msg.projectDetail}</Link>
      </S.Content>
    </S.Card>
  );
};

export default ProjectCard;
