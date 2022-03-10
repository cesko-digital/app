import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "components/theme/default";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { analyticsId } from "lib/utils";
import "components/global.css";

function MyApp({ Component, pageProps }: AppProps) {
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

  return (
    <ThemeProvider theme={defaultTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
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
