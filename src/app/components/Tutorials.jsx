'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';

function Tutorials() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axios
        .get('/api/tutorials')
        .then((response) => {
          setTutorials(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Failed to fetch tutorials:', error);
          setLoading(false);
        });
    } else {
      setTutorials([]); 
      setLoading(false);
    }
  }, [user]); 

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
      <h1>Tutorials</h1>

      {loading ? (
        <p>Loading tutorials...</p>
      ) : tutorials?.length === 0 ? (
        <p>No tutorials found or failed to fetch data.</p>
      ) : (
        <ul>
          {tutorials?.map((tutorial) => (
            <li key={tutorial?.id}>
              <p>
                {tutorial?.title} - {tutorial?.link}
              </p>
              {tutorial?.link && ReactPlayer.canPlay(tutorial?.link) ? (
                <ReactPlayer
                  url={tutorial?.link}
                  controls={true}
                  width={320}
                  height={240}
                />
              ) : (
                <p>Invalid video URL.</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tutorials;
