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
      <div className="max-w-2xl mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label htmlFor="content" className="block mb-1">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            {error && <p className="text-red-600">{error}</p>}
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Post
            </button>
          </form>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Posts</h2>
          {myPosts.length === 0 ? (
            <p>You haven't posted anything yet.</p>
          ) : (
            <ul className="space-y-4">
              {myPosts.map((post) => (
                <li key={post._id} className="border p-4 rounded-lg hover:shadow">
                  <h3 className="text-xl font-semibold">{post.title}</h3>
                  <p className="text-gray-600 text-sm">
                    Created at {new Date(post.createdAt).toLocaleString()}
                  </p>
                  <p className="mt-2">{post.content}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </ProtectedRoute>
  );
}