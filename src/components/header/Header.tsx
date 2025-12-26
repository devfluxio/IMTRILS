import Link from 'next/link';
import Image from 'next/image';
import { useState, useContext } from 'react';
import { SearchContext } from '@/layouts/PrimaryLayout';
import { useTranslation } from 'next-i18next';
import { Transition } from '@headlessui/react';
import { IconType } from 'react-icons';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { Search } from './Search';
import { TopBar } from './TopBar';
import { MegaMenu } from './MegaMenu';
import { BottomNavigation } from '@/components';

export interface NavLink {
  name: 'men' | 'women' | 'kids' | 'sale' | 'blog' | 'contacts';
  href: string;
  collapsible?: boolean;
}

export const navLinks: NavLink[] = [
  { name: 'men', href: '/products/men' },
  { name: 'women', href: '/products/women' },
  { name: 'sale', href: '/sale' },
  { name: 'blog', href: '/blog' },
  { name: 'contacts', href: '/contacts' },
];

export const sideNavLinks: [string, IconType][] = [
  ['/wishlist', FiHeart],
  ['/cart', FiShoppingBag],
];

export const Header = ({ collections }: { collections: any[] }) => {
  const { t } = useTranslation('header');
  const [hoveredNavLink, setHoveredNavLink] = useState<NavLink | null>(null);
  const { setSearchValue } = useContext(SearchContext);
  // Disable menu on hover for men/women
  const handleShowMenu = (navLink: NavLink) => {};
  const handleCloseMenu = () => {};

  return (
    <header>
      <TopBar />
      <div className="relative h-14 bg-white shadow-md shadow-gray-200">
        <div className="mx-auto flex h-full items-center px-4 xl:container">
          <div className="mr-5 flex shrink-0 items-center">
            <Link href="/">
              <Image
                priority
                src="/logo.jpeg"
                alt="logo"
                width={70}
                height={28}
                quality={100}
                style={{objectFit: 'contain'}}
              />
            </Link>
          </div>
          <ul className="ml-auto hidden h-full md:flex">
            {navLinks.map((item, index) => (
              <li
                className={`font-medium text-neutral-700 transition-colors`}
                key={index}
              >
                <Link
                  href={item.href}
                  className="flex h-full items-center px-5"
                >
                  {t(item.name)}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="ml-auto items-center md:flex">
            <Search onSearch={setSearchValue} />
            {sideNavLinks.map(([url, Icon]) => (
              <Link key={url} href={url} className="ml-5 hidden md:block">
                <Icon
                  className="text-neutral-700 transition-colors hover:text-violet-700"
                  size="20px"
                />
              </Link>
            ))}
          </ul>
        </div>
        <Transition show={Boolean(hoveredNavLink?.collapsible)}>
          {/* MegaMenu disabled for men/women */}
        </Transition>
      </div>
      <BottomNavigation navLinks={navLinks} collections={collections} />
    </header>
  );
};
