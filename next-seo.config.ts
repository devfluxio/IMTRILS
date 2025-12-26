import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  defaultTitle: 'Imtrils',
  titleTemplate: '%s | Imtrils',
  description:
    'Ecommerce built with T3 Stack : NextJS, TypeScript, tRPC, Prisma, NextAuth and styled with Tailwind CSS',
  canonical: 'https://imtrils.vercel.app',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://imtrils.vercel.app',
    siteName: 'Imtrils',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

export default config;
