import styled from "styled-components";
import { Heading3, heading4Styles } from "components/typography";

export const Card = styled.div`
  box-sizing: content-box;
  display: flex;
  flex-direction: column;
  position: relative;

  min-height: 454px;
  background-color: white;

  overflow: hidden;

  border-radius: ${({ theme }) => theme.borderRadius.base}px;
  border: 2px solid ${({ theme }) => theme.colors.lightGray};
`;

export const FadedCard = styled(Card)`
  filter: grayscale(1);
  opacity: 0.5;
`;

export const Header = styled.div`
  position: relative;
  height: 170px;
`;

export const Note = styled.div`
  font-weight: bold;
  position: absolute;
  bottom: 0px;
  right: 0px;
  z-index: 900;
  background: rgba(255, 255, 255, 0.2);
  width: 100%;
  text-align: right;
  padding: 4px 8px;
`;

export const CoverWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 255, 0.5);
  border-top-left-radius: ${({ theme }) => theme.borderRadius.base}px;
  border-top-right-radius: ${({ theme }) => theme.borderRadius.base}px;
`;

export const Cover = styled.div<{ url: string }>`
  position: absolute;
  width: 100%;
  height: 100%;

  background-image: url(${({ url }) => url});
  background-position: center;
  background-size: cover;
  filter: grayscale(100%);
  border-top-left-radius: ${({ theme }) => theme.borderRadius.base}px;
  border-top-right-radius: ${({ theme }) => theme.borderRadius.base}px;
`;
Cover.defaultProps = {
  role: "img",
};

export const Logo = styled.div<{ url: string }>`
  position: absolute;
  left: ${({ theme }) => theme.space.lg}px;
  bottom: -24px;

  width: 82px;
  height: 82px;

  background-color: ${({ theme }) => theme.colors.white};
  background-image: url(${({ url }) => url});
  background-position: center;
  background-size: cover;

  border-radius: 50%;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(8, 8, 50, 0.12);
`;
Logo.defaultProps = {
  role: "img",
};

export const Content = styled.div`
  box-sizing: content-box;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: ${({ theme }) => theme.space.lg}px;
`;

export const Title = styled(Heading3)`
  ${heading4Styles}
  margin-bottom: 29px;
`;

export const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;

  list-style: none;
  margin: 0;
  padding: 0;
`;

export const Tag = styled.li`
  background-color: ${({ theme }) => theme.colors.pebble};
  border-radius: ${({ theme }) => theme.borderRadius.base / 2}px;

  font-size: ${({ theme }) => theme.fontSizes.small}px;
  text-transform: lowercase;

  margin-right: ${({ theme }) => theme.space.small}px;
  margin-bottom: ${({ theme }) => theme.space.small}px;
  padding: ${({ theme }) => theme.space.small}px;
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base}px;
  margin-top: 0px;
  margin-bottom: 20px;
  flex-grow: 1;
`;

export const ShortInfoBubbles = styled.div`
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: ${({ theme }) => theme.space.md}px;
`;

export const ShortInfoBubble = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small}px;
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.pebble};
  border-radius: ${({ theme }) => theme.borderRadius.base / 2}px;
  padding: ${({ theme }) => theme.space.small}px
    ${({ theme }) => theme.space.small * 2}px;
  margin-right: ${({ theme }) => (theme.space.md + theme.space.small) / 2}px;
  &:last-of-type {
    margin-right: 0;
  }
`;
