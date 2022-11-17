import * as S from "./styles";
import strings from "content/strings.json";
import { useContext } from "react";
import { SectionContent } from "components/layout";
import { ThemeContext } from "styled-components";

interface Props {
  memberCount: number;
}

const Numbers = ({ memberCount }: Props) => {
  const theme = useContext(ThemeContext);
  const numbers = strings.pages.homepage.sections.numbers;
  return (
    <S.CustomSection backgroundColor={theme.colors.pebble}>
      <SectionContent verticalPadding={70}>
        <S.Wrapper>
          <S.Item key="first">
            <S.Value>{Math.floor(memberCount / 100) * 100}+</S.Value>
            <S.Subtitle>{numbers.first.subtitle}</S.Subtitle>
          </S.Item>
          <S.Item key="second">
            <S.Value>{numbers.second.value}</S.Value>
            <S.Subtitle>{numbers.second.subtitle}</S.Subtitle>
          </S.Item>
          <S.Item key="third">
            <S.Value>{numbers.third.value}</S.Value>
            <S.Subtitle>{numbers.third.subtitle}</S.Subtitle>
          </S.Item>
          <S.Item key="fourth">
            <S.Value>{numbers.fourth.value}</S.Value>
            <S.Subtitle>{numbers.fourth.subtitle}</S.Subtitle>
          </S.Item>
        </S.Wrapper>
      </SectionContent>
    </S.CustomSection>
  );
};

export default Numbers;
