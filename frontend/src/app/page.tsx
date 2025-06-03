import axios from 'axios';
import Link from 'next/link';

interface Post {
  _id: string;
  title: string;
  content: string;
  authorId: { _id: string; email: string };
  createdAt: string;
}

export default async function Home() {
  let posts: Post[] = [];
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
    posts = res.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    posts = [];
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-light text-gray-900 mb-12">Posts</h1>
        
        {posts.length === 0 ? (
          <p className="text-gray-500 text-sm">No posts available</p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post._id} className="bg-white border border-gray-200 p-6">
                <Link href={`/posts/${post._id}`}>
                  <h2 className="text-lg font-medium text-gray-900 mb-3 hover:text-gray-700 cursor-pointer">
                    {post.title}
                  </h2>
                </Link>
                <div className="flex items-center text-xs text-gray-400 mb-4 space-x-4">
                  <span>{post.authorId.email}</span>
                  <span>•</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {post.content.substring(0, 200)}
                  {post.content.length > 200 && '...'}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}