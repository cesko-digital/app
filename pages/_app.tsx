import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "components/theme/default";
import "components/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
