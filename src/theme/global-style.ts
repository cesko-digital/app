import { createGlobalStyle } from 'styled-components'

// omit extension in path, assumes woff2, woff & eot present
const useFont = (name: string, weight: number, path: string): string => `
  @font-face {
    font-family: '${name}';
    src: 
      url('${path}.woff2') format('woff2'),
      url('${path}.woff') format('woff'),
      url('${path}.eot') format('eot');
    font-weight: ${weight};
    font-style: normal;
  }
`

export const GlobalStyle = createGlobalStyle`
  ${useFont('Cesko Digital', 400, '/fonts/cesko.digital-regular')}
  ${useFont('Cesko Digital', 500, '/fonts/cesko.digital-medium')}
  ${useFont('Cesko Digital', 600, '/fonts/cesko.digital-semibold')}
  ${useFont('Cesko Digital', 700, '/fonts/cesko.digital-bold')}
  ${useFont('Cesko Digital Mono', 400, '/fonts/cesko.digital.mono-regular')}
  ${useFont('Cesko Digital Mono', 500, '/fonts/cesko.digital.mono-medium')}
  ${useFont('Cesko Digital Mono', 600, '/fonts/cesko.digital.mono-semibold')}
  ${useFont('Cesko Digital Mono', 700, '/fonts/cesko.digital.mono-bold')}

  html, body {
    margin: 0;
    padding: 0;
    font-family: ${(props) => props.theme.fonts.body};
  }

  html,
  body,
  #___gatsby,
  #gatsby-focus-wrapper {
    height: 100%;
  }
`
