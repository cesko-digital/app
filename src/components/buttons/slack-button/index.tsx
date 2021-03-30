import * as React from 'react'
import { SlackIcon } from 'components/icons'

import * as S from './styles'
import { ButtonAsLink } from 'components/links'

export interface SlackButtonProps {
  slackLink: string
  slackText: string
}

const SlackButton: React.FC<SlackButtonProps> = ({
  slackLink,
  slackText,
  ...other
}) => {
  return (
    <ButtonAsLink inverted to={slackLink} {...other}>
      <>
        <SlackIcon /> <S.ButtonLabel>{slackText}</S.ButtonLabel>
      </>
    </ButtonAsLink>
  )
}

export default SlackButton
