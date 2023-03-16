import Document, { Html, Main, Head, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import Script from "next/script";

// This was introduced to make Styled Components work. If we later
// switch to a different styling method, we can safely delete the whole
// file.
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  // We customize the render method to get Weglot translation up working
  // event before the document gets interactive. See Next.js documentation:
  //
  // https://nextjs.org/docs/messages/no-before-interactive-script-outside-document
  //
  // TBD: Could we skip the script completely when serving the Czech version?
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <Script
            type="text/javascript"
            src="https://cdn.weglot.com/weglot.min.js"
            strategy="beforeInteractive"
          />
          <Script id="weglot">
            {`Weglot.initialize({ api_key: '${process.env.NEXT_PUBLIC_WEGLOT_API_KEY}', hide_switcher: true });`}
          </Script>
        </body>
      </Html>
    );
  }
}
