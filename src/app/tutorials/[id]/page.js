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
              <div className='w-[50%] flex justify-center items-center gap-7 h-full'>
              <Button>Add Notes➕</Button>
              <Button>Completed✅</Button>
              </div>
            </div>
        </div>
    );
}
