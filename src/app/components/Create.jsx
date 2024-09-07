'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'

function Create() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !link) {
      alert('Please fill in both the title and link fields.');
      return;
    }

    try {
      const response = await fetch('/api/tutorials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, link }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Tutorial posted successfully!');
        setTitle(''); // Clear the input fields after successful submission
        setLink('');
        router.push('/'); // Navigate to the homepage or wherever you want to go after posting
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to post the tutorial.');
      }
    } catch (error) {
      console.error('Error posting tutorial:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div>
      {user ? (
        <button className="rounded-xl font-bold" onClick={() => signOut()}>
          Sign out
        </button>
      ) : (
        <button className="rounded-xl font-bold" onClick={() => signIn()}>
          Sign in
        </button>
      )}

      {user && (
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-64 h-48 rounded-xl">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-2 p-2 border rounded"
          />
          <input
            type="url"
            placeholder="Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="mb-2 p-2 border rounded"
          />

          <button type="submit" className="rounded-xl font-bold bg-blue-500 text-white p-2">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default Create;
