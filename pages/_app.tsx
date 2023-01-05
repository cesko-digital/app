import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "components/theme/default";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { detectLanguageFromUrl, Lang, LangContext } from "components/language";
import "components/global.css";

// This will report web vitals to Axiom:
// https://www.axiom.co/docs/integrations/vercel#web-vitals
export { reportWebVitals } from "next-axiom";

type GlobalProps = {
  session: Session;
};

function MyApp({ Component, pageProps }: AppProps<GlobalProps>) {
  // Provide language context for interested components.
  // The language us detected using the full document URL –
  // the English version is detected by the document being
  // served from the “en.cesko.digital” domain provided by
  // Weglot.
  const [lang, setLang] = useState<Lang>("cs");
  useEffect(() => {
    setLang(detectLanguageFromUrl(window.location.href));
  }, [setLang]);

  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={defaultTheme}>
        <LangContext.Provider value={lang}>
          <Component {...pageProps} />
        </LangContext.Provider>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
