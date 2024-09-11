'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SingleTutorialPage({ params }) {
    const { id } = params; 

    const [tutorial, setTutorial] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOPen, setIsModalOpen] = useState(false);
    const [notes, setNotes] = useState('');
    const [editing, setEditing] = useState(false);

    const modalHandler = () => {
        setIsModalOpen(!isModalOPen)
    }

    const completedHandler = async() => {
        try {
            const res = await axios.patch(`/api/tutorials/${id}`);
            setTutorial(res.data);
            const updatedTutorial = res.data;
            if(updatedTutorial?.done){
                toast('Tutorial Completed Yayyyyy🎉')
            }
            else{
                toast('Tutorial Marked Incomplete🙁')
            }
        } catch (error) {
            console.log(error);
            toast('Unexpected error occurred')
        }
    }

    const addNotesHandler = async() => {
        try {
            const res = await axios.post(`/api/tutorials/${id}`, {notes});
            setTutorial(res.data);
            setNotes('');
            setIsModalOpen(false);
            toast.success("Notes added successfully🎉");
        } catch (error) {
            console.log(error);
            toast.error('Error adding notes');
        }
    }

    const editNotesHandler = async () => {
        try {
            const res = await axios.put(`/api/tutorials/${id}`, {notes});
            setTutorial(res.data);
            setEditing(false);
            toast.success("Notes updated successfully🎉");
        } catch (error) {
            console.log(error);
            toast.error('Error updating notes');
        }
    };

    const deleteNotesHandler = async () => {
        try {
            const res = await axios.delete(`/api/tutorials/${id}`);
            setTutorial({...tutorial, notes: ''});
            toast.success("Notes deleted successfully");
        } catch (error) {
            console.log(error);
            toast.error('Error deleting notes');
        }
    };

    useEffect(() => {
        if (id) { 
            axios.get(`/api/tutorials/${id}`)
                .then((res) => {
                    setTutorial(res.data);
                    setNotes(res.data.notes || '');
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
            <ToastContainer/>
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
              {!tutorial?.notes ? (
                  <Button onClick={modalHandler}>Add Notes</Button>
              ) : (
                  <>
                      <Button onClick={() => setEditing(!editing)}>Edit Notes⚙</Button>
                      <Button onClick={deleteNotesHandler}>Delete Notes⛔</Button>
                  </>
              )}
              <Button onClick={completedHandler}>
                {tutorial?.done ? 'Mark Incomplete' : 'Completed✅'}
              </Button>
              </div>

              {tutorial?.notes && !editing && (
                <div className='flex flex-col justify-center max-w-xl items-center space-y-4 bg-purple-600 bg-opacity-55 px-6 py-3 rounded-xl border border-gray-300'>
                    <p className='text-white'>{tutorial.notes}</p>
                </div>
              )}

              {editing && (
                <div className='flex flex-col justify-center items-center space-y-4 bg-purple-600 bg-opacity-55 px-6 py-3 rounded-xl border border-gray-300'>
                    <textarea 
                        placeholder='edit your notes here...' 
                        className='dark text-black border border-violet-300 rounded-xl px-6 py-3' 
                        value={notes} 
                        onChange={(e) => setNotes(e.target.value)}
                    />
                    <Button variant='outline' onClick={editNotesHandler}>Save</Button>
                </div>
              )}

              {isModalOPen && !tutorial?.notes &&
                <div className='flex flex-col justify-center items-center space-y-4 bg-purple-600 bg-opacity-55 px-6 py-3 rounded-xl border border-gray-300'>
                   <div className='flex justify-between w-full'>
                   <Button variant='outline' onClick={addNotesHandler}>Add</Button>
                   <p onClick={() => setIsModalOpen(false)} className='cursor-pointer p-2 rounded-full bg-white text-[12px]'>❌</p>
                   </div>
                   <textarea 
                       placeholder='add your notes here...' 
                       className='dark text-black border border-violet-300 rounded-xl w-[300px] h-[400px] px-6 py-3' 
                       value={notes} 
                       onChange={(e) => setNotes(e.target.value)}
                   />
                </div>
              }
              </div>
            </div>
        </div>
    );
}
