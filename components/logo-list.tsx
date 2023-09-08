import { getResizedImgUrl } from "lib/utils";
import styled from "styled-components";

const LOGO_WIDTH_PX = 160;
const LOGO_MOBILE_WIDTH_PX = 144;

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
    <List>
      {items.map((logo, index) => (
        <Item key={index}>
          <Link href={logo.linkUrl} target="_blank">
            <Logo
              alt=""
              src={getResizedImgUrl(logo.logoUrl, 320)}
              loading="lazy"
            />
          </Link>
        </Item>
      ))}
    </List>
  );
};

const List = styled.ul`
  display: grid;
  grid-gap: 24px 90px;
  grid-template-columns: repeat(auto-fill, ${LOGO_WIDTH_PX}px);
  list-style-type: none;
  padding: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fill, ${LOGO_MOBILE_WIDTH_PX}px);
    grid-gap: 24px 24px;
    margin-bottom: 65px;
  }
`;

const Item = styled.li``;

const Link = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${LOGO_WIDTH_PX}px;
  height: 80px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: ${LOGO_MOBILE_WIDTH_PX}px;
  }
`;

const Logo = styled.img`
  max-width: 100%;
  max-height: 100%;
  height: auto;
`;

export default LogoList;
