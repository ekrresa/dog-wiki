import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Mystery+Quest&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
export default MyApp;
