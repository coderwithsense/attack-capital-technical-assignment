'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        { email, password }
      );
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-light text-gray-900">Create Account</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border-0 border-b border-gray-200 py-3 px-0 text-gray-900 placeholder-gray-400 bg-transparent focus:border-gray-900 focus:outline-none focus:ring-0"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border-0 border-b border-gray-200 py-3 px-0 text-gray-900 placeholder-gray-400 bg-transparent focus:border-gray-900 focus:outline-none focus:ring-0"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Create Account
          </button>
        </form>
        
        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="text-gray-900 hover:underline font-medium">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}