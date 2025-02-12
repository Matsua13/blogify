// components/LogoutButton.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch('/api/auth/logout', { method: 'POST' });
    if (res.ok) {
      // Redirige vers la page d'accueil après la déconnexion
      router.push('/');
    } else {
      alert("Error while disconnecting.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="ml-4 text-red-500 underline hover:text-red-700"
    >
      Log out
    </button>
  );
}
