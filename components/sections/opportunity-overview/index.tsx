import { BodySmall, Body } from "components/typography";
import { PortalOpportunity, PortalProject } from "lib/portal-types";
import { Route } from "lib/routing";
import * as S from "./styles";

interface Props {
  opportunity: PortalOpportunity;
  relatedProject: PortalProject;
}

const OpportunityItem: React.FC<Props> = ({ opportunity, relatedProject }) => {
  return (
    <S.Container>
      <S.OpportunityWrapper>
        <div>
          <a href={Route.toOpportunity(opportunity)}>
            <S.OpportunityHeading>{opportunity.name}</S.OpportunityHeading>
          </a>
          <S.OpportunityMetaWrapper>
            <BodySmall>{opportunity.timeRequirements}</BodySmall>
            <BodySmall>{opportunity.skills.join(", ")}</BodySmall>
          </S.OpportunityMetaWrapper>
        </div>
        <S.OpportunityRightWrapper>
          <a href={relatedProject.url}>
            <Body>{relatedProject.name}</Body>
          </a>
          <S.OpportunityLogo src={relatedProject.logoUrl} />
        </S.OpportunityRightWrapper>
      </S.OpportunityWrapper>
    </S.Container>
  );
};

export default OpportunityItem;
