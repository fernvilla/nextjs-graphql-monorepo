import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

export default class Document extends NextDocument {
  static getInitialProps(ctx: DocumentContext) {
    return NextDocument.getInitialProps(ctx);
  }

  render() {
    return (
      <Html>
        <Head />

        <body>
          <ColorModeScript />
          <Main />
          <NextScript />

          <script type="text/javascript" async src="https://platform.twitter.com/widgets.js"></script>
        </body>
      </Html>
    );
  }
}
