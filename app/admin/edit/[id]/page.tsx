// app/admin/edit/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Post {
  title: string;
  content: string;
  published: boolean;
}

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams() as { id: string };
  const postId = params.id;

  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [error, setError] = useState('');

  // Récupération des données de l'article au chargement de la page
  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(`/api/posts/${postId}`);
      if (res.ok) {
        const data = await res.json();
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
        setPublished(data.published);
      } else {
        setError("Error while recovering the article");
      }
    }
    fetchPost();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, published }),
    });
    const data = await res.json();
    if (res.ok) {
      router.push('/admin');
    } else {
      setError(data.error || "Error while updating");
    }
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Edit the article</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label> Title: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label> Content: </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', minHeight: '150px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            &nbsp; Publish article
          </label>
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Update
        </button>
      </form>
    </main>
  );
}
