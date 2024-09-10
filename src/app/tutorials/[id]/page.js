'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function SingleTutorialPage({ params }) {
    const { id } = params; 

    const [tutorial, setTutorial] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOPen, setIsModalOpen] = useState(true);

    const modalHandler = () => {
        setIsModalOpen(!isModalOPen)
    }

    useEffect(() => {
        if (id) { 
            axios.get(`/api/tutorials/${id}`)
                .then((res) => {
                    setTutorial(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!tutorial) {
        return <div>Tutorial not found</div>;
    }

    return (
        <div className='min-h-screen w-full flex flex-col justify-center items-center'>
            <h2 className='text-6xl mb-32 text-purple-500 font-bold'>{tutorial?.title}</h2>
            <div className='h-full w-full flex justify-between md:px-16 px6 items-center'>
              {tutorial?.link && ReactPlayer.canPlay(tutorial?.link) ? (
                  <ReactPlayer
                      url={tutorial?.link}
                      controls={true}
                      width={800}
                      height={600}
                  />
              ) : (
                  <p>Invalid video URL.</p>
              )}
              <div className='w-[50%] flex flex-col space-y-6 justify-center items-center h-full'>
              <div className='flex gap-7'>
              <Button  onClick={modalHandler}>Add Notes➕</Button>
              <Button>Completed✅</Button>
              </div>

              { isModalOPen === true &&
                <div className='flex flex-col justify-center items-center space-y-4 bg-purple-600 bg-opacity-55 px-6 py-3 rounded-xl border border-gray-300'>
                   <div className='flex justify-between gap-2'>
                   <Button>Edit⚙️</Button>
                   <Button>Remove Notes🗑️</Button>
                   <p onClick={() => setIsModalOpen(false)} className='cursor-pointer p-2 rounded-full bg-white text-[12px]'>❌</p>
                   </div>
                   <textarea placeholder='add your notes here...' className='dark text-black border border-violet-300 rounded-xl px-6 py-3' value={tutorial?.notes}/>
                </div>
              }
              </div>
            </div>
        </div>
    );
}
