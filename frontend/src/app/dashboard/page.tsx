'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyPosts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.id;
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/posts?author=${userId}`
        );
        setMyPosts(res.data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      }
    };

    fetchMyPosts();
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/post`,
        { title, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/posts?author=${userId}`
      );
      setMyPosts(res.data);
      setTitle('');
      setContent('');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create post');
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto py-12 px-4">
          <h1 className="text-2xl font-light text-gray-900 mb-12">Dashboard</h1>

          <div className="bg-white border border-gray-200 p-8 mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-6">New Post</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full border-0 border-b border-gray-200 py-3 px-0 text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none focus:ring-0"
              />
              <textarea
                placeholder="Write your post..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                required
                className="w-full border-0 border-b border-gray-200 py-3 px-0 text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none focus:ring-0 resize-none"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="bg-gray-900 text-white px-6 py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Publish
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900">Your Posts</h2>
            {myPosts.length === 0 ? (
              <p className="text-gray-500 text-sm">No posts yet</p>
            ) : (
              <div className="space-y-6">
                {myPosts.map((post) => (
                  <div key={post._id} className="bg-white border border-gray-200 p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{post.title}</h3>
                    <p className="text-gray-400 text-xs mb-4">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 leading-relaxed">{post.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}