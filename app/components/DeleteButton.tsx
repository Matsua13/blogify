// app/components/DeleteButton.tsx
'use client';

interface DeleteButtonProps {
  postId: number;
}

export default function DeleteButton({ postId }: DeleteButtonProps) {
  const handleDelete = async () => {
    if (confirm("Do you want to delete this article?")) {
      const res = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        credentials: 'include' // Ajoutez cette option pour envoyer les cookies
      });
      if (res.ok) {
        location.reload();
      } else {
        alert("Error while deleting");
      }
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-500 underline">
      Delete
    </button>
  );
}
