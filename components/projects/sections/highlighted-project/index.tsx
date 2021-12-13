import * as S from "./styles";
import { ButtonAsLink } from "components/links";
import strings from "content/strings.json";

interface Props {
  title: string;
  description: string;
  cover: string;
  logo: string;
  link: string;
  tags: string[];
}

const HighlightedProject: React.FC<Props> = ({
  title,
  description,
  cover,
  logo,
  link,
  tags,
}) => {
  return (
    <S.Container data-cy="highlighted-project">
      <S.ProjectImage src={cover} />
      <S.Content>
        <S.ProjectInfo>
          <S.Avatar src={logo} />
          <S.Name>{title}</S.Name>
          <S.Tags>
            {tags.map((tag, index) => (
              <S.Tag key={index}>#{tag}</S.Tag>
            ))}
          </S.Tags>
          {description && <S.Tagline>{description}</S.Tagline>}
          <ButtonAsLink inverted to={link}>
            {strings.cards.project.projectDetail}
          </ButtonAsLink>
        </S.ProjectInfo>
      </S.Content>
    </S.Container>
  );
};

export default HighlightedProject;
