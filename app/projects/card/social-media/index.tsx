import * as S from "./styles";

export interface Props {
  logo: React.FC<React.SVGProps<SVGSVGElement>>;
  url: string;
  name: string;
}

const SocialMedia: React.FC<Props> = ({ logo, url, name }) => {
  const SocialIcon = logo;
  return (
    <S.Container>
      <S.Logo>
        <SocialIcon />
      </S.Logo>
      <S.Link href={url}>{name}</S.Link>
    </S.Container>
  );
};
export default SocialMedia;
