import axios from 'axios';
import Link from 'next/link';
// import styles from '../../styles/Home.module.css';

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Posts</h1>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post._id} className="border p-4 rounded-lg hover:shadow">
              <Link href={`/posts/${post._id}`}> 
                <h2 className="text-2xl font-semibold cursor-pointer">{post.title}</h2>
              </Link>
              <p className="text-gray-600 text-sm">
                By {post.authorId.email} on {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p className="mt-2">{post.content.substring(0, 150)}...</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}