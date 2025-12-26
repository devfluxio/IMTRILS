import React, { useState, createContext } from 'react';
// Context for global search value
export const SearchContext = createContext<{searchValue: string, setSearchValue: (v: string) => void}>({searchValue: '', setSearchValue: () => {}});
import { NextSeo, type NextSeoProps } from 'next-seo';
import { Header, Footer } from '@/components';

interface PrimaryLayoutProps extends React.PropsWithChildren {
  seo: NextSeoProps;
}

export const PrimaryLayout = ({ seo, children }: PrimaryLayoutProps) => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <SearchContext.Provider value={{searchValue, setSearchValue}}>
      <NextSeo noindex={true} nofollow={true} {...seo} />
      <div className="min-h-screen">
        <Header collections={[]} />
        {children}
      </div>
      <Footer />
    </SearchContext.Provider>
  );
};
