import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "components/theme/default";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { analyticsId } from "lib/utils";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { detectLanguageFromUrl, Lang, LangContext } from "components/language";
import "components/global.css";

type GlobalProps = {
  session: Session;
};

function MyApp({ Component, pageProps }: AppProps<GlobalProps>) {
  // Since Google Analytics doesn’t support client-side navigation out
  // of the box, we have to mark pageviews there manually when route changes.
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      logPageViewToAnalytics(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    // This is a cleanup routine that will unsubscribe
    // from route change notifications when component unmounts.
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

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

function logPageViewToAnalytics(path: string) {
  try {
    (window as any).gtag("config", analyticsId, {
      page_path: path,
    });
  } catch (e) {
    console.error(`Failed to log page view: ${e}`);
  }
}

export default MyApp;
