import * as S from "./styles";
import { SectionContent } from "components/layout";
import { defaultTheme } from "components/theme/default";

interface Props {
  memberCount: number;
}

const Numbers = ({ memberCount }: Props) => {
  return (
    <S.CustomSection backgroundColor={defaultTheme.colors.pebble}>
      <SectionContent verticalPadding={70}>
        <S.Wrapper>
          <S.Item key="first">
            <S.Value>{Math.floor(memberCount / 100) * 100}+</S.Value>
            <S.Subtitle>členů komunity</S.Subtitle>
          </S.Item>
          <S.Item key="second">
            <S.Value>16+</S.Value>
            <S.Subtitle>rozjetých projektů</S.Subtitle>
          </S.Item>
          <S.Item key="third">
            <S.Value>28</S.Value>
            <S.Subtitle>akcelerovaných projektů</S.Subtitle>
          </S.Item>
          <S.Item key="fourth">
            <S.Value>4 000 000+</S.Value>
            <S.Subtitle>lidí využilo naše projekty</S.Subtitle>
          </S.Item>
        </S.Wrapper>
      </SectionContent>
    </S.CustomSection>
  );
};

export default Numbers;
