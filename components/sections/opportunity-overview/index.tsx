import { BodySmall } from "components/typography";
import { PortalOpportunity } from "lib/airtable/opportunity";
import { PortalProject } from "lib/airtable/project";
import { doNotTranslate } from "lib/utils";
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
            <S.OpportunityHeading>{opportunity.name}</S.OpportunityHeading>
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
                    <BodySmall className={doNotTranslate}>
                      {relatedProject.name}
                    </BodySmall>
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
