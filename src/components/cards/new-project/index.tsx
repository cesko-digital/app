import React from 'react'
import * as S from './styles'
import ButtonAsLink from '../../links/button-as-link'
import { BulbIcon } from 'components/icons'
import { LINKS } from 'utils/constants'

interface Project {
  name: string
  description: string
  linkText: string
}

const NewProject: React.FC = () => {
  const t: Project = {
    name: 'Mám nápad na projekt',
    description:
      'Rozvíjíme nápady, které skrze IT pomáhají zlepšovat život v Česku, nemají komerční alternativu a jsou udržitelné. Máte takový projekt, nebo na něm pracujete, ale chybí vám expertní dobrovolníci?',
    linkText: 'Zadat projekt',
  }
  return (
    <S.Wrapper>
      <BulbIcon />
      <S.Title>{t.name}</S.Title>
      <S.Description>{t.description}</S.Description>
      <S.ButtonWrapper>
        <ButtonAsLink to={LINKS.submitProject}>{t.linkText}</ButtonAsLink>
      </S.ButtonWrapper>
    </S.Wrapper>
  )
}

export default NewProject
