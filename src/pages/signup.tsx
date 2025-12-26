import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PrimaryLayout } from '@/layouts';
import { useTranslation } from 'next-i18next';
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

const Signup: NextPageWithLayout = () => {
  const { t } = useTranslation('header');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Signup failed');
        setLoading(false);
        return;
      }

      const data = await res.json();
      setToken(data.token);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
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
          Create Account
        </h3>

        {token && (
          <div className="mb-6 rounded bg-green-100 p-3 text-left">
            <p className="text-xs font-semibold text-green-800">✓ Account created! Token:</p>
            <textarea
              readOnly
              className="mt-2 w-full text-xs bg-white border rounded p-2 h-24 break-all"
              value={token}
            />
            <p className="mt-2 text-xs text-gray-600">Paste this token in <Link href="/admin" className="text-blue-600 underline">Admin Panel</Link> (if you're an admin)</p>
          </div>
        )}

        {error && (
          <div className="mb-4 rounded bg-red-100 p-3 text-left text-xs text-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-3">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full rounded border px-3 py-2 text-sm"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
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
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full rounded border px-3 py-2 text-sm"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-violet-600 px-4 py-2 font-medium text-white hover:bg-violet-700 disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-xs text-gray-600">
          Already have an account? <Link href="/signin" className="text-blue-600 hover:underline">Sign in</Link>
        </p>

        <p className="mt-6 text-xs font-normal">
          By signing up, you agree to our{' '}
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

Signup.getLayout = function getLayout(page: ReactElement) {
  return (
    <PrimaryLayout
      seo={{
        title: 'Sign up',
        description: 'Create account',
        canonical: 'https://imtrils.vercel.app/signup',
      }}
    >
      {page}
    </PrimaryLayout>
  );
};

export default Signup;
