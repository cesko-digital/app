import React from 'react'

global.__BASE_PATH__ = ''

export const TranslatedLink = (params) =>
  React.createElement('a', {
    ...params,
    href: params.to,
  })

export const TranslateUrlsContext = React.createContext({ locale: 'cs' })
