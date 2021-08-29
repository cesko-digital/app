import { Partner } from 'generated/graphql-types'
import { Logo } from '.'

export type PartnerLogoInfo = Pick<Partner, 'name' | 'logoUrl' | 'url'>

export const mapPartnerLogoInfoToLogo = (
  partnerLogo: PartnerLogoInfo
): Logo => {
  return {
    name: partnerLogo.name,
    linkUrl: partnerLogo.url,
    logoUrl: partnerLogo.logoUrl,
  }
}
