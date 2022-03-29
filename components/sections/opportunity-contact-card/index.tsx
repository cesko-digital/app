import { Body } from "components/typography";
import { PortalOpportunity, PortalProject, PortalUser } from "lib/portal-types";
import { Route } from "lib/routing";
import Link from "next/link";
import * as S from "components/dashboard/opportunity/styles";
import TimeIcon from "../../icons/time";
import OwnerContact from "../../dashboard/opportunity";
import {resolveContactTitle} from "./resolve-contact-title";

interface Props {
    opportunity: PortalOpportunity;
    parentProject: PortalProject;
    owner: PortalUser
}

const OpportunityContactCard: React.FC<Props> = ({ opportunity, parentProject, owner }) => {
    return (
        <S.OpportunityContactCard>
            <S.OpportunityMetaRow>
                <S.OpportunityProjectImg src={parentProject.logoUrl} />
                {parentProject.state === "draft" ||
                    (parentProject.state === "internal" && (
                        <Body>{parentProject.name}</Body>
                    ))}
                {parentProject.state !== "draft" &&
                    parentProject.state !== "internal" && (
                        <Link href={Route.toProject(parentProject)}>
                            <a>
                                <Body>{parentProject.name}</Body>
                            </a>
                        </Link>
                    )}
            </S.OpportunityMetaRow>
            <S.OpportunityMetaRow>
                <TimeIcon />
                <Body>{opportunity.timeRequirements}</Body>
            </S.OpportunityMetaRow>
            <S.OpportunityOwnerWrapper>
                <Body>Kontaktní osoba</Body>
                <S.OwnerWrapper>
                    <S.OwnerImage src={owner.profilePictureUrl} />
                    <OwnerContact email={owner.email} name={owner.name} />
                </S.OwnerWrapper>
            </S.OpportunityOwnerWrapper>
            <a href={opportunity.contactUrl} target="blank" data-testid="contact-url">
                <S.OpportunitySlackButton>
                    {resolveContactTitle(opportunity.contactUrl)}
                </S.OpportunitySlackButton>
            </a>
        </S.OpportunityContactCard>
    );
};

export default OpportunityContactCard;
