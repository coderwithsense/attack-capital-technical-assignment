'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Personal Blog' }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    setMounted(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <span className="font-bold text-xl cursor-pointer">My Blog</span>
          </Link>
          {mounted && (
            <div className="flex space-x-4">
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard">
                    <span className="cursor-pointer">Dashboard</span>
                  </Link>
                  <button onClick={handleLogout} className="hover:underline">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <span className="cursor-pointer">Login</span>
                  </Link>
                  <Link href="/signup">
                    <span className="cursor-pointer">Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
      <main className="container mx-auto p-4">{children}</main>
    </>
  );
};

export default Layout;