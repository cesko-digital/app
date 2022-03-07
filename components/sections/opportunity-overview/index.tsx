import { BodySmall, Body } from "components/typography";
import { PortalOpportunity, PortalProject } from "lib/portal-types";
import { Route } from "lib/routing";
import Link from "next/link";
import * as S from "./styles";

interface Props {
  opportunity: PortalOpportunity;
  relatedProject?: PortalProject;
}

const OpportunityItem: React.FC<Props> = ({ opportunity, relatedProject }) => {
  return (
    <S.Container>
      <S.OpportunityWrapper>
        <div>
          <Link href={Route.toOpportunity(opportunity)}>
            <a>
              <S.OpportunityHeading>{opportunity.name}</S.OpportunityHeading>
            </a>
          </Link>
          <S.OpportunityMetaWrapper>
            <BodySmall>{opportunity.timeRequirements}</BodySmall>
            <BodySmall>{opportunity.skills.join(", ")}</BodySmall>
          </S.OpportunityMetaWrapper>
        </div>
        {relatedProject && (
          <S.OpportunityRightWrapper>
            {relatedProject.state !== "draft" &&
              relatedProject.state !== "internal" && (
                <Link href={Route.toProject(relatedProject)}>
                  <a>
                    <Body>{relatedProject.name}</Body>
                  </a>
                </Link>
              )}
            {(relatedProject.state === "draft" ||
              relatedProject.state === "internal") && (
              <Body>{relatedProject.name}</Body>
            )}
            <S.OpportunityLogo src={relatedProject.logoUrl} />
          </S.OpportunityRightWrapper>
        )}
      </S.OpportunityWrapper>
    </S.Container>
  );
};

export default OpportunityItem;
