import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000';

export default function VerifyEmail() {
  const router = useRouter();
  const { token } = router.query;
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    if (!token) return;
    fetch(`${API_BASE}/api/auth/verify-email?token=${token}`)
      .then(async res => {
        const data = await res.json();
        if (res.ok) {
          setStatus('success');
          setMessage('Email verified! You can now sign in.');
        } else {
          setStatus('error');
          setMessage(data.message || 'Verification failed.');
        }
      })
      .catch(() => {
        setStatus('error');
        setMessage('Verification failed.');
      });
  }, [token]);

  return (
    <div className="mt-20 flex justify-center px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 text-center text-base">
        <h3 className="mb-10 text-xl font-semibold leading-6 text-gray-900">
          Email Verification
        </h3>
        <div className={`mb-4 rounded p-3 text-left text-xs ${status === 'success' ? 'bg-green-100 text-green-800' : status === 'error' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
          {message}
        </div>
        {status === 'success' && (
          <a href="/signin" className="text-blue-600 hover:underline">Sign in</a>
        )}
      </div>
    </div>
  );
}
