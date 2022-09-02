import React from "react";
import { CardRow, Section, SectionContent } from "components/layout";
import { Heading2, Heading3 } from "components/typography";
import LogoList from "components/logo-list";
import * as S from "../../styles";
import { ButtonLink } from "components/buttons/button/styles";
import { ButtonSize } from "components/buttons";
import BlogCard from "components/cards/blog-card";
import strings from "content/strings.json";
import { BlogHeader } from "./styles";
import { Article } from "lib/related-blog-posts";
import { filterPartnersByCategory, PortalPartner } from "lib/airtable/partner";

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
        <S.PaddedBody>{msg.heading.perex}</S.PaddedBody>
      </SectionContent>
      <SectionContent verticalPadding={0}>
        <Heading3>{msg.mainPartners.title}</Heading3>
        <S.PaddedBody>{msg.mainPartners.perex}</S.PaddedBody>
        <S.PaddedBody>
          <LogoList items={mainPartners} />
        </S.PaddedBody>
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
        <S.PaddedBody>{msg.regularPartners.perex}</S.PaddedBody>
        <S.PaddedBody>
          <LogoList items={regularPartners} />
        </S.PaddedBody>
      </SectionContent>
      <SectionContent>
        <Heading3>{msg.donators.title}</Heading3>
        <S.PaddedBody>{msg.donators.perex}</S.PaddedBody>
        <S.PaddedBody>
          <ButtonLink
            size={ButtonSize.Normal}
            href="https://www.darujme.cz/projekt/1203553"
            target="_blank"
          >
            {msg.donators.button}
          </ButtonLink>
        </S.PaddedBody>
      </SectionContent>
    </Section>
  );
};

export default FinancialPartners;
