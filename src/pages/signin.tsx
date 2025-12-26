import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PrimaryLayout } from '@/layouts';
import { signIn } from 'next-auth/react';
import { BsGithub, BsTwitter } from 'react-icons/bs';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

const Signin: NextPageWithLayout = () => {
  const { t } = useTranslation('header');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  // Remove token display, use localStorage
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleBasicSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        setError('Invalid email or password');
        setLoading(false);
        return;
      }
      const data = await res.json();
      // Save token to localStorage if not already present
      if (data.token && !localStorage.getItem('authToken')) {
        localStorage.setItem('authToken', data.token);
      }
      setToken('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError('Server error. Check console.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-20 flex justify-center px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 text-center text-base">
        <h3 className="mb-10 text-xl font-semibold leading-6 text-gray-900">
          Sign in
        </h3>

        {/* Token is now saved to localStorage, not shown */}

        {error && (
          <div className="mb-4 rounded bg-red-100 p-3 text-left text-xs text-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleBasicSignin} className="mb-6 space-y-3">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded border px-3 py-2 text-sm"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded border px-3 py-2 text-sm"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-violet-600 px-4 py-2 font-medium text-white hover:bg-violet-700 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In with Email'}
          </button>
        </form>

        <div className="mb-6 flex items-center gap-2">
          <div className="h-px flex-1 bg-gray-200"></div>
          <span className="text-xs text-gray-500">OR</span>
          <div className="h-px flex-1 bg-gray-200"></div>
        </div>

        <button
          type="button"
          className="my-1.5 flex w-full items-center justify-center gap-3 rounded-md border border-solid border-zinc-400 bg-white px-4 py-2 font-medium transition hover:bg-zinc-100"
          onClick={() => signIn('google')}
        >
          <Image
            src="/assets/google.svg"
            alt="continue with google"
            width="20"
            height="20"
          />
          {t('auth.google')}
        </button>
        <button
          type="button"
          className="my-1.5 flex w-full items-center justify-center gap-3 rounded-md bg-zinc-900 px-4 py-2 font-medium text-white transition hover:bg-black"
          onClick={() => signIn('github')}
        >
          <BsGithub size="1.2rem" />
          {t('auth.github')}
        </button>
        <button
          type="button"
          className="my-1.5 flex w-full items-center justify-center gap-3 rounded-md bg-[#1DA1F2] px-4 py-2 font-medium text-white transition hover:bg-[#0977ba]"
          onClick={() => signIn('twitter')}
        >
          <BsTwitter size="1.2rem" />
          {t('auth.twitter')}
        </button>

        <div className="mt-6 text-xs text-gray-600">
          <p className="mb-2">Don't have an account? <Link href="/signup" className="text-blue-600 hover:underline">Sign up</Link></p>
        </div>

        <p className="mt-10 text-xs font-normal">
          By signing in, you agree to our{' '}
          <Link href="terms-service" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="privacy-policy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

Signin.getLayout = function getLayout(page: ReactElement) {
  return (
    <PrimaryLayout
      seo={{
        title: 'Sign in',
        description: 'Sign in',
        canonical: 'https://karashop.vercel.app/signin',
      }}
    >
      {page}
    </PrimaryLayout>
  );
};

export default Signin;
