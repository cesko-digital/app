import * as S from "./styles";
import { Link } from "components/links";
import strings from "content/strings.json";

export interface BlogCardProps {
  title: string;
  description?: string;
  cover: string;
  link: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  cover,
  link,
  description,
  ...rest
}) => {
  return (
    <S.Card {...rest}>
      <S.Header>
        <S.Cover url={cover} />
      </S.Header>
      <S.Content>
        <S.Title>{title}</S.Title>
        {description && <S.Description>{description}</S.Description>}
        {!description && <br />}
        <Link to={link}>{strings.cards.blog.readMore}</Link>
      </S.Content>
    </S.Card>
  );
};

export default BlogCard;
