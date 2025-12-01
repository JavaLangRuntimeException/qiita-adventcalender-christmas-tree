import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Kaisei_Decol } from 'next/font/google';

const kaiseiDecol = Kaisei_Decol({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎄</text></svg>" />
      </Head>
      <div className={kaiseiDecol.className}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
