'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { IoIosLogOut } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { SkeletonCard } from './SkeletonCard';


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
    <div className='min-h-screen w-full flex flex-col justify-center items-center'>

      <nav className='flex w-full justify-between py-4 px-10'>
        <p className='font-bold'>Tutorial Tracker 📝</p>
        <div className='flex gap-4'>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button>Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="px-2 py-4 float-end">
              <DropdownMenuItem className='flex justify-center items-center gap-2' onClick={() => router.push('/tutorials')}>
                Add Tutorial <FaPlus size={15} />
              </DropdownMenuItem>         
                {user ? (
                  <DropdownMenuItem className='flex justify-center items-center gap-2' onClick={() => signOut()}>
                    Sign out <IoIosLogOut size={15} />
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={() => signIn()}>
                    Sign in
                  </DropdownMenuItem>
                )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Avatar>
            <AvatarImage src={user?.image} alt={user?.name} />
          </Avatar>
        </div>
      </nav>

      <h1 className='text-6xl text-purple-500 font-bold'>Your Tutorials</h1>

      {loading ? (
        <p>Loading...</p>
      ) : tutorials?.length === 0 ? (
        <SkeletonCard/>
      ) : (
        <ul className='mt-12 grid grid-cols-1 md:grid-cols-2 gap-16'>
          {tutorials?.map((tutorial) => (
            <li key={tutorial?.id} className='py-4'>
              <p className='text-2xl font-bold py-2'>
                {tutorial?.title}
              </p>
              {tutorial?.link && ReactPlayer.canPlay(tutorial?.link) ? (
                <ReactPlayer
                  url={tutorial?.link}
                  controls={true}
                  width={360}
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
