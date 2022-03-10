import {
  OpennessIcon,
  ProfessionalismIcon,
  EfficiencyIcon,
  ParticipatoryIcon,
  UsersIcon,
  WadgeIcon,
} from "components/icons";
import csstrings from "content/strings.json";
import enstrings from "content/strings-en.json";
import * as S from "./styles";

interface Props {
  lang?: "cs" | "en";
}

const OurValues: React.FC<Props> = ({ lang = "cs" }) => {
  const strings = lang === "cs" ? csstrings : enstrings;
  const ourValues = strings.pages.homepage.sections.ourValues;
  return (
    <S.Container>
      <S.MainTitle>{ourValues.main.title}</S.MainTitle>
      <S.MainPerex>{ourValues.main.perex}</S.MainPerex>

      <S.WadgeContainer>
        <S.WadgeIconContainerTop>
          <WadgeIcon />
        </S.WadgeIconContainerTop>
        <S.WadgeIconContainerBottom>
          <WadgeIcon />
        </S.WadgeIconContainerBottom>
      </S.WadgeContainer>

      <S.ValuesWrapper>
        <Value
          key="openness"
          id="openness"
          Icon={OpennessIcon}
          title={ourValues.openness.title}
          perex={ourValues.openness.perex}
        />
        <Value
          key="professionalism"
          id="professionalism"
          Icon={ProfessionalismIcon}
          title={ourValues.professionalism.title}
          perex={ourValues.professionalism.perex}
        />
        <Value
          key="efficiency"
          id="efficiency"
          Icon={EfficiencyIcon}
          title={ourValues.efficiency.title}
          perex={ourValues.efficiency.perex}
        />
        <Value
          key="participatory"
          id="participatory"
          Icon={ParticipatoryIcon}
          title={ourValues.participatory.title}
          perex={ourValues.participatory.perex}
        />
        <Value
          key="users"
          id="users"
          Icon={UsersIcon}
          title={ourValues.users.title}
          perex={ourValues.users.perex}
        />
      </S.ValuesWrapper>
    </S.Container>
  );
};

interface ValueProps {
  id: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  perex: string;
}

const Value: React.FC<ValueProps> = ({ Icon, title, perex }) => (
  <S.ValueWrapper>
    <S.ValueIconContainer>
      <Icon />
    </S.ValueIconContainer>
    <S.ValueTitle>{title}</S.ValueTitle>
    <S.ValuePerex>{perex}</S.ValuePerex>
  </S.ValueWrapper>
);

export default OurValues;
