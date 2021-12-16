import styled from "styled-components";

export const Project = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`;

export const LinkWrapper = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: inherit;
  text-decoration: none;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 20px;
`;

export const AvatarTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
`;
