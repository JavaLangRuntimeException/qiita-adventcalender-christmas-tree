import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Kaisei_Decol } from 'next/font/google';

const kaiseiDecol = Kaisei_Decol({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={kaiseiDecol.className}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
