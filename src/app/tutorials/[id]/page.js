'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function SingleTutorialPage({ params }) {
    const { id } = params; // Extract ID from params

    const [tutorial, setTutorial] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter(); // Ensure useRouter is used here

    useEffect(() => {
        if (id) { // Ensure id is available before making the request
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
            <h2 className='text-4xl text-purple-500 font-bold'>{tutorial.title}</h2>
            {tutorial?.link && ReactPlayer.canPlay(tutorial?.link) ? (
                <ReactPlayer
                    url={tutorial?.link}
                    controls={true}
                    width={640}
                    height={360}
                />
            ) : (
                <p>Invalid video URL.</p>
            )}
            <Input placeholder='Add Notes' value={tutorial?.notes} />
            <Button>Completed✅</Button>
        </div>
    );
}
