// app/page.tsx
import prisma from '@/lib/prisma';
import Link from 'next/link';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import PostsList from './components/PostsList';
import LogoutButton from './components/LogoutButton';

export default async function HomePage() {
  let isAdmin = false;
  const cookieStore = cookies();
  const token = (await cookieStore).get('token')?.value;

  if (token) {
    try {
      // Vérification du token côté serveur
      jwt.verify(token, process.env.JWT_SECRET!);
      isAdmin = true;
    } catch (error) {
      console.error("Not an admin", error);
      // Token invalide, on reste en mode visiteur
    }
  }

  // Si admin : on récupère TOUS les articles, sinon seulement les articles publiés
  const posts = await prisma.post.findMany({
    where: isAdmin ? {} : { published: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="min-h-screen bg-gray-100 p-8">
    <h1 className="text-4xl font-bold text-center mb-8 font-serif text-gray-800">
      Blogify - Actuality
    </h1>
    <div className="mb-8 flex justify-center items-center">
      {isAdmin ? (
        <div className="flex items-center space-x-4">
          <p className="text-green-600 font-serif">Connected as an administrator.</p>
          <Link href="/admin/create" className="text-blue-500 hover:underline font-serif">
            Create a new article
          </Link>
          <LogoutButton />
        </div>
      ) : (
        <Link href="/login" className="text-blue-500 hover:underline font-serif">
          Log in
        </Link>
      )}
    </div>
    <PostsList posts={posts} isAdmin={isAdmin} />
  </main>
);
}
