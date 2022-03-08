import React from "react";
import * as S from "./styles";
import ButtonAsLink from "components/shared/button-as-link";
import strings from "content/strings.json";

interface Props {
  title: string;
  description: string;
  cover: string;
  logo: string;
  link: string;
  tags: string[];
  actionLink: string;
  actionTitle: string;
}

const HighlightedEvent: React.FC<Props> = ({
  title,
  description,
  cover,
  logo,
  link,
  tags,
  actionLink,
  actionTitle,
}) => {
  return (
    <S.Container>
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
          {actionLink && (
            <ButtonAsLink inverted to={actionLink}>
              {actionTitle}
            </ButtonAsLink>
          )}
          <S.DetailLink to={link}>
            {strings.components.cards.eventCard.detail}
          </S.DetailLink>
        </S.ProjectInfo>
      </S.Content>
    </S.Container>
  );
};

export default HighlightedEvent;
