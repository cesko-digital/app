import React from 'react'
import {
  BoxWrapper,
  CreditsCell,
  ResourceCell,
  TableOfContentCell,
} from './styles'
import * as Typography from '../../../components/typography'
import {
  MarkdownRemarkFrontmatterCredits,
  MarkdownRemarkFrontmatterSources,
  MarkdownRemarkFrontmatterTableOfContent,
} from '../../../generated/graphql-types'

interface TableOfContentBoxProps {
  data: MarkdownRemarkFrontmatterTableOfContent[]
}

interface ResourcesBoxProps {
  data: MarkdownRemarkFrontmatterSources[]
}

interface CreditsBoxProps {
  data: MarkdownRemarkFrontmatterCredits[]
}

export const TableOfContentBox: React.FC<TableOfContentBoxProps> = ({
  data,
}) => {
  return (
    <BoxWrapper>
      <h2>Obsah</h2>
      {data.map((value, index) => {
        return (
          <TableOfContentCell key={index} href={'?start=' + value.start}>
            <span>{value.title}</span>
            <span>{value.time}</span>
          </TableOfContentCell>
        )
      })}
    </BoxWrapper>
  )
}

export const ResourceBox: React.FC<ResourcesBoxProps> = ({ data }) => {
  return (
    <BoxWrapper>
      <h2>Zdroje</h2>
      {data.map((value, index) => {
        return (
          <ResourceCell key={index} href={value.url} target="_blank">
            <Typography.BodyBig>{value.title}</Typography.BodyBig>
            <Typography.BodySmall>{value.url}</Typography.BodySmall>
          </ResourceCell>
        )
      })}
    </BoxWrapper>
  )
}

export const CreditsBox: React.FC<CreditsBoxProps> = ({ data }) => {
  return (
    <BoxWrapper>
      <h2>Vytvořili</h2>
      {data.map((value, index) => {
        return (
          <CreditsCell key={index}>
            <Typography.BodySmall>{value.title}</Typography.BodySmall>
            <Typography.BodyBig>{value.name}</Typography.BodyBig>
          </CreditsCell>
        )
      })}
    </BoxWrapper>
  )
}
