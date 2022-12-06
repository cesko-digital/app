import { getResizedImgUrl } from "lib/utils";
import * as S from "./styles";

export interface Logo {
  name: string;
  logoUrl: string;
  linkUrl?: string;
}

interface LogoListProps {
  items: readonly Logo[];
}

const LogoList: React.FC<LogoListProps> = ({ items }) => {
  return (
    <S.List>
      {items.map((logo, index) => (
        <S.Item key={index}>
          <S.Link href={logo.linkUrl} target="_blank">
            <S.Logo
              alt=""
              src={getResizedImgUrl(logo.logoUrl, 320)}
              loading="lazy"
            />
          </S.Link>
        </S.Item>
      ))}
    </S.List>
  );
};

export default LogoList;
