import { graphql } from "gatsby";

export const query = graphql`
    query Opportunities($locale: String!) {
        roles: allOpportunity(filter: { status: { eq: "live" } }) {
            nodes {
                id
                name
                timeRequirements
                skills
                project {
                    name
                    logoUrl
                    url
                }
            }
        }
        locales: allLocale(filter: { language: { eq: $locale } }) {
            edges {
                node {
                ns
                data
                language
                }
            }
        }
    }
`

export { default } from 'page-components/portal-dobrovolnika/roles'