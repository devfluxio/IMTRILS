import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { DefaultSeo } from 'next-seo';
import NextNProgress from 'nextjs-progressbar';
import AOS from 'aos';
import SEO from '../../next-seo.config';
import 'aos/dist/aos.css';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export type NextPageWithLayout<P = unknown> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);

  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
    });
  }, []);

  return getLayout(
    <>
      <main className={`${inter.variable} font-sans`}>
        <DefaultSeo {...SEO} />
        <NextNProgress color="#8b5cf6" height={3} options={{ showSpinner: false }} />
        <Component {...pageProps} />
      </main>
      <Analytics />
    </>
  );
}

export default appWithTranslation(MyApp);
