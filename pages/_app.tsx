import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { BreedProvider } from '../lib/breed';
import { Layout } from '../components/Layout';
import '../styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BreedProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </BreedProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
