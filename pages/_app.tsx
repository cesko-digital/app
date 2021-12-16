import type { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { defaultTheme } from "components/theme/default";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: ${(props) => props.theme.fonts.body};
  }
`;

// This is here only because of Styled Components. If we manage to find some other
// styling solution, it should be possible to simplify this whole file.
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
