import * as React from 'react'
import * as S from './styles'
import Link from '../../links/link'
import { ButtonSize } from '../../buttons'

export interface Crumb {
  label: string
  path?: string
}

export interface BreadcrumbProps {
  crumbs: Crumb[]
  homeLabel?: string
  homeLink?: string
}

function transformCrumbs(
  crumbs: Crumb[]
): { firstCrumbs: Crumb[]; lastCrumb?: Crumb } {
  let firstCrumbs = [...crumbs]
  const lastCrumb = firstCrumbs.pop()

  return {
    firstCrumbs,
    lastCrumb,
  }
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  crumbs,
  homeLabel = 'Homepage',
  homeLink = '/',
}: BreadcrumbProps) => {
  const { firstCrumbs, lastCrumb } = transformCrumbs(crumbs)
  return (
    <S.OrderedList>
      {crumbs.length > 0 && (
        <S.ListItem>
          <Link size={ButtonSize.Small} to={homeLink}>
            {homeLabel}
          </Link>
        </S.ListItem>
      )}

      {firstCrumbs.map((c, i) => {
        return (
          <>
            <S.Separator>/</S.Separator>
            <S.ListItem>
              {c.path ? (
                <Link size={ButtonSize.Small} to={c.path}>
                  {c.label}
                </Link>
              ) : (
                <S.Current>{c.label}</S.Current>
              )}
            </S.ListItem>
          </>
        )
      })}

      {lastCrumb && (
        <>
          <S.Separator>/</S.Separator>
          <S.ListItem>
            <S.Current>{lastCrumb.label}</S.Current>
          </S.ListItem>
        </>
      )}
    </S.OrderedList>
  )
}

export default Breadcrumb
