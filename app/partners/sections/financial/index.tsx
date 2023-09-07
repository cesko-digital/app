import React from "react";
import { CardRow, Section, SectionContent } from "components/layout";
import { Body, Heading2, Heading3 } from "components/typography";
import LogoList from "components/logo-list";
import { ButtonLink } from "components/buttons/button/styles";
import { ButtonSize } from "components/buttons";
import BlogCard from "components/cards/blog-card";
import strings from "content/strings.json";
import { BlogHeader } from "./styles";
import { Article } from "lib/data-sources/blog";
import { filterPartnersByCategory, PortalPartner } from "lib/airtable/partner";
import styled from "styled-components";

interface Props {
  partners: readonly PortalPartner[];
  blogPosts: readonly Article[];
}

const FinancialPartners: React.FC<Props> = ({ partners, blogPosts }) => {
  const msg = strings.pages.partners.financial;
  const mainPartners = filterPartnersByCategory(partners, "financial.main");
  const regularPartners = filterPartnersByCategory(
    partners,
    "financial.regular"
  );
  return (
    <Section>
      <SectionContent verticalPadding={60}>
        <Heading2>{msg.heading.title}</Heading2>
        <PaddedBody>{msg.heading.perex}</PaddedBody>
      </SectionContent>
      <SectionContent verticalPadding={0}>
        <Heading3>{msg.mainPartners.title}</Heading3>
        <PaddedBody>{msg.mainPartners.perex}</PaddedBody>
        <PaddedBody>
          <LogoList items={mainPartners} />
        </PaddedBody>
      </SectionContent>
      {blogPosts.length > 0 && (
        <SectionContent>
          <BlogHeader>
            <Heading3>{strings.pages.partners.blog.title}</Heading3>
          </BlogHeader>
          <CardRow>
            {blogPosts.map((post) => (
              <BlogCard key={post.url} link={post.url} {...post} />
            ))}
          </CardRow>
        </SectionContent>
      )}
      <SectionContent verticalPadding={60}>
        <Heading3>{msg.regularPartners.title}</Heading3>
        <PaddedBody>{msg.regularPartners.perex}</PaddedBody>
        <PaddedBody>
          <LogoList items={regularPartners} />
        </PaddedBody>
      </SectionContent>
      <SectionContent>
        <Heading3>{msg.donators.title}</Heading3>
        <PaddedBody>{msg.donators.perex}</PaddedBody>
        <PaddedBody>
          <ButtonLink
            size={ButtonSize.Normal}
            href="https://www.darujme.cz/projekt/1203553"
            target="_blank"
          >
            {msg.donators.button}
          </ButtonLink>
        </PaddedBody>
      </SectionContent>
    </Section>
  );
};

const PaddedBody = styled(Body)`
  padding: 34px 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 16px 0;
  }
`;

export default FinancialPartners;
