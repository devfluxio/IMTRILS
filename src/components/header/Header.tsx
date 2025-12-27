import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
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
  { name: 'contacts', href: '/contact' },
];

export const sideNavLinks: [string, IconType][] = [
  ['/wishlist', FiHeart],
  ['/cart', FiShoppingBag],
];

export const Header = ({ collections }: { collections: any[] }) => {
  const router = useRouter();
  const { t } = useTranslation('header');
  const [hoveredNavLink, setHoveredNavLink] = useState<NavLink | null>(null);
  const { setSearchValue } = useContext(SearchContext);
  // Auth state for logout/signup button
  // Only render one button at a time based on token
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Check authToken on mount and on route change
  useEffect(() => {
    const checkAuth = () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
      setIsLoggedIn(!!token);

      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setIsAdmin(payload.role === 'admin');
          setUserEmail(payload.email || null);
        } catch (e) {
          setIsAdmin(false);
          setUserEmail(null);
        }
      } else {
        setIsAdmin(false);
        setUserEmail(null);
      }
    };
    checkAuth();
    router.events?.on('routeChangeComplete', checkAuth);
    window.addEventListener('storage', checkAuth);
    return () => {
      router.events?.off('routeChangeComplete', checkAuth);
      window.removeEventListener('storage', checkAuth);
    };
  }, [router]);
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      setIsLoggedIn(false);
      setIsAdmin(false);
      router.push('/');
    }
  };

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
                className={`font-medium text-neutral-700 transition-colors ${
                  router.asPath.startsWith(item.href) ? 'bg-neutral-100' : ''
                }`}
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
          <ul className="ml-auto items-center md:flex relative pr-16">
            <Search onSearch={setSearchValue} />
            {/* Only one button shows at a time based on isLoggedIn */}
            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="ml-5 hidden md:block px-4 py-1 rounded bg-neutral-900 text-white hover:bg-neutral-800 font-medium"
                  >
                    Admin
                  </Link>
                )}
                {/* Profile icon with initials */}
                {userEmail && (
                  <div
                    className="hidden md:flex items-center justify-center rounded-full bg-gradient-to-br from-purple-900 via-black to-black text-white font-bold text-base w-8 h-8 select-none shadow-md border-2 border-white absolute right-4 top-1/2 -translate-y-1/2 z-10"
                    style={{paddingLeft: '8px', paddingRight: '8px'}}
                    title={userEmail}
                  >
                    {userEmail.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="ml-5 hidden md:block px-4 py-1 rounded bg-neutral-200 text-neutral-700 hover:bg-neutral-300 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/signup"
                className="ml-5 hidden md:block px-4 py-1 rounded bg-black text-white hover:bg-neutral-900 font-medium"
              >
                Signup
              </Link>
            )}
            {/* Move sideNavLinks to the left of profile icon */}
            <div className="flex items-center">
              {sideNavLinks.map(([url, Icon], idx) => (
                <Link key={url} href={url} className={`ml-5 hidden md:block`}>
                  <Icon
                    className="text-neutral-700 transition-colors hover:text-violet-700"
                    size="20px"
                  />
                </Link>
              ))}
            </div>
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
