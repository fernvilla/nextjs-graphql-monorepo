import { ApolloProvider } from '@apollo/client';
import { useApollo } from './../lib/apolloClient';
import { AppProps } from 'next/app';
import SiteLayout from '../components/SiteLayout';
import Head from 'next/head';
import { Chakra } from '../Chakra';

import '../styles/globals.css';

type Props = AppProps & {
  cookies?: string;
};

const App = ({ cookies, Component, pageProps }: Props) => {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Chakra cookies={cookies}>
        <Head>
          <title>Sports Blitz</title>
        </Head>

        <SiteLayout>
          <Component {...pageProps} />
        </SiteLayout>
      </Chakra>
    </ApolloProvider>
  );
};

export default App;
export { getServerSideProps } from '../Chakra';
