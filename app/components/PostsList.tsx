// components/PostsList.tsx (Client Component)
'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
  image?: string; // optionnel : URL de l'image
}

interface PostsListProps {
  posts: Post[];
  isAdmin: boolean;
}

export default function PostsList({ posts, isAdmin }: PostsListProps) {
  const [postsList, setPostsList] = useState<Post[]>(posts);

  const handleDelete = async (id: number) => {
    if (confirm("Do you want to delete this article?")) {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPostsList(postsList.filter((post) => post.id !== id));
      } else {
        alert("Error while deleting");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8">
      {postsList.map((post) => (
        <div key={post.id} className="relative bg-white border border-gray-300 rounded-lg shadow-md p-6 pt-16">
          {/* Image circulaire centrée, en position absolue pour chevaucher le haut de l'encadré */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
            <Image
              src={post.image || 'https://via.placeholder.com/150'}
              alt={post.title}
              width={80}  // corresponds to Tailwind's w-20 (80px)
              height={80} // corresponds to Tailwind's h-20 (80px)
              className="rounded-full border-4 border-gray-200 shadow-lg"
            />
          </div>
          <h2 className="mt-4 text-2xl font-serif font-bold text-center text-gray-800">
            {post.title}
          </h2>
          <p className="mt-2 text-gray-700 text-justify font-serif">
            {post.content.slice(0, 300)}...
          </p>
          <div className="mt-4 flex justify-between items-center">
            <Link href={`/post/${post.id}`} className="text-blue-500 hover:underline">
              Read more
            </Link>
            {isAdmin && (
              <div className="flex space-x-3">
                <Link href={`/admin/edit/${post.id}`} className="text-green-500 hover:underline">
                  Edit
                </Link>
                <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:underline">
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
