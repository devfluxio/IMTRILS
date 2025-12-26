import Link from 'next/link';
import React from 'react';
import { BsArrowRight, BsFacebook, BsInstagram, BsYoutube, BsWhatsapp } from 'react-icons/bs';

export const Footer = () => {
  const whatsAppNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919517416729';
  const whatsAppUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL || `https://wa.me/${whatsAppNumber}`;
  const year = new Date().getFullYear();

  return (
    <footer className="mb-16 bg-neutral-50 md:mb-0">
      <div className="mx-auto max-w-7xl px-4 pt-12 md:pt-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] lg:gap-8">
          {/* Newsletter Section */}
          <section className="max-w-lg">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              Stay Intimately Informed
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              Get the latest updates on new arrivals, exclusive offers, and intimate fashion trends delivered straight to your inbox.
            </p>
            
            <form className="mt-6 flex" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="newsletter-email" className="sr-only">
                Email Address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Email Address"
                required
                className="min-w-0 flex-1 rounded-l-md border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="flex items-center justify-center rounded-r-md bg-neutral-900 px-6 text-white transition-colors hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
              >
                <BsArrowRight className="h-4 w-4" />
              </button>
            </form>
            
            <p className="mt-3 text-xs text-neutral-500">
              You can unsubscribe anytime.{' '}
              <Link href="/privacy-policy" className="underline decoration-neutral-400 underline-offset-2 transition-colors hover:text-neutral-900">
                Privacy Policy applies
              </Link>
              .
            </p>
          </section>

          {/* Shop Column */}
          <nav className="flex flex-col">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-neutral-900">
              Shop
            </h3>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li>
                <Link href="/products/men" className="transition-colors hover:text-neutral-900">
                  For Him
                </Link>
              </li>
              <li>
                <Link href="/products/women" className="transition-colors hover:text-neutral-900">
                  For Her
                </Link>
              </li>
              <li>
                <Link href="/sale" className="transition-colors hover:text-neutral-900">
                  Sale
                </Link>
              </li>
            </ul>
          </nav>

          {/* Quick Links Column */}
          <nav className="flex flex-col">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-neutral-900">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li>
                <Link href="/about" className="transition-colors hover:text-neutral-900">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="transition-colors hover:text-neutral-900">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/size-chart" className="transition-colors hover:text-neutral-900">
                  Size Chart
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="transition-colors hover:text-neutral-900">
                  Blogs
                </Link>
              </li>
            </ul>
          </nav>

          {/* Support Column */}
          <nav className="flex flex-col">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-neutral-900">
              Support
            </h3>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li>
                <Link href="/shipping-policy" className="transition-colors hover:text-neutral-900">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="transition-colors hover:text-neutral-900">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/order-tracking" className="transition-colors hover:text-neutral-900">
                  Order Tracking
                </Link>
              </li>
            </ul>
          </nav>

          {/* Follow Us Column */}
          <nav className="flex flex-col">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-neutral-900">
              Follow Us
            </h3>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li>
                <Link 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-neutral-900"
                >
                  <BsInstagram className="h-4 w-4" />
                  <span>Instagram</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-neutral-900"
                >
                  <BsFacebook className="h-4 w-4" />
                  <span>Facebook</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-neutral-900"
                >
                  <BsYoutube className="h-4 w-4" />
                  <span>YouTube</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Brand / Bottom Area */}
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-12 md:pb-10 md:pt-14">
        <div className="flex items-end justify-between gap-6">
          <p className="text-xs text-neutral-600">Imtrils © {year}</p>
          <div className="flex-1 text-right">
            <span className="block font-serif text-4xl font-bold italic leading-none tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
              Imtrils
            </span>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp */}
      <Link
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-4 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white shadow-md transition-all hover:bg-green-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 md:right-6"
      >
        <BsWhatsapp className="h-4 w-4" />
      </Link>
    </footer>
  );
};
