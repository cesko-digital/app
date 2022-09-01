import { BodySmall } from "components/typography";
import { PortalProject } from "lib/airtable/project";
import { PortalOpportunity } from "lib/portal-types";
import { Route } from "lib/utils";
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
            <S.OpportunityRightContent>
              {relatedProject.state !== "draft" &&
                relatedProject.state !== "internal" && (
                  <Link href={Route.toProject(relatedProject)}>
                    <a>
                      <BodySmall>{relatedProject.name}</BodySmall>
                    </a>
                  </Link>
                )}
              {(relatedProject.state === "draft" ||
                relatedProject.state === "internal") && (
                <BodySmall>{relatedProject.name}</BodySmall>
              )}
              <S.OpportunityLogo src={relatedProject.logoUrl} />
            </S.OpportunityRightContent>
          </S.OpportunityRightWrapper>
        )}
      </S.OpportunityWrapper>
    </S.Container>
  );
};

export default OpportunityItem;
