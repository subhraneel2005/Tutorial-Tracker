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
import Navbar from './Navbar';


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

  const dynamicPageHandler = (id) => {
    router.push(`/tutorials/${id}`);
  }

  if(loading){
    return(
        <div className='min-h-screen w-full flex justify-center items-center'>
          <p>Loading...</p>
        </div>
    )
  }

  return (
    <>
    <div className='min-h-screen w-full flex flex-col justify-center items-center'>
    <Navbar/>
      <h2 className='text-6xl text-[#e0aaff] py-6 font-bold mt-[200px]'>Your Tutorials</h2>

      { tutorials?.length === 0 ? (
        <div className='mt-6 space-y-5 flex flex-col justify-center items-center '>
           <p className='textxl'>You have no tutorials</p>

           <Button onClick={() => router.push('/tutorials')}>Add a Tutorial</Button>
        </div>
      ) : (
        <ul className='mt-12 grid grid-cols-1 md:grid-cols-2 gap-16'>
          {tutorials?.map((tutorial) => (
            <li key={tutorial?.id} className='p-5 flex flex-col justify-center items-center border tutorialBox'>
              <p onClick={() => dynamicPageHandler(tutorial?.id)} className='max-w-[360px] text-[#c77dff] cursor-pointer text-2xl font-bold py-2'>
                {tutorial?.title}
              </p>
              {tutorial?.link && ReactPlayer.canPlay(tutorial?.link) ? (
                <ReactPlayer
                  url={tutorial?.link}
                  controls={true}
                  width={340}
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
    </>
  );
}

export default Tutorials;
