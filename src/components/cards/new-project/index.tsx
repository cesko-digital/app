import React from 'react'
import * as S from './styles'
import ButtonAsLink from '../../links/button-as-link'
import { BulbIcon } from 'components/icons'

export interface NewProjectProps {
  name: string
  description: string
  linkUrl: string
  linkText: string
}

const NewProject: React.FC<NewProjectProps> = () => {
  const t = {
    name: 'Mám nápad na projekt',
    description:
      'Rozvíjíme nápady, které skrze IT pomáhají zlepšovat život v Česku, nemají komerční alternativu a jsou udržitelné. Máte takový projekt, nebo na něm pracujete, ale chybí vám expertní dobrovolníci?',
    linkUrl: 'https://cesko-digital.slack.com/archives/CHG9NA23D',
    linkText: 'Zadat projekt',
  }
  return (
    <S.Wrapper>
      <BulbIcon />
      <S.Title>{t.name}</S.Title>
      <S.Description>{t.description}</S.Description>
      <S.ButtonWrapper>
        <ButtonAsLink to={t.linkUrl}>{t.linkText}</ButtonAsLink>
      </S.ButtonWrapper>
    </S.Wrapper>
  )
}

export default NewProject
