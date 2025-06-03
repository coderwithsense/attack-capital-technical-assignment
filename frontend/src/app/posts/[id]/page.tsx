import axios from 'axios';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Post {
  _id: string;
  title: string;
  content: string;
  authorId: { _id: string; email: string };
  createdAt: string;
}

interface PostPageProps {
  params: {
    id: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  let post: Post | null = null;
  
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post/${params.id}`);
    post = res.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    notFound();
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-12 px-4">
        <Link 
          href="/" 
          className="text-gray-400 text-sm hover:text-gray-600 mb-8 inline-block"
        >
          ← Back to posts
        </Link>
        
        <article className="bg-white border border-gray-200 p-8">
          <h1 className="text-2xl font-light text-gray-900 mb-6">
            {post.title}
          </h1>
          
          <div className="flex items-center text-xs text-gray-400 mb-8 space-x-4">
            <span>By {post.authorId.email}</span>
            <span>•</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}