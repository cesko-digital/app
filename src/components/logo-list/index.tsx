import React from 'react'
import * as S from './styles'

interface Logo {
  name: string
  logoUrl: string
  linkUrl: string
}

interface LogoListProps {
  logos: Logo[]
}

const LogoList: React.FC<LogoListProps> = ({ logos }) => {
  return (
    <S.List>
      {logos.map((logo, index) => (
        <S.Item key={index}>
          <S.Link href={logo.linkUrl} target="_blank">
            <S.Logo
              alt={`${logo.name} logo`}
              src={logo.logoUrl}
              loading="lazy"
            />
          </S.Link>
        </S.Item>
      ))}
    </S.List>
  )
}

export default LogoList
