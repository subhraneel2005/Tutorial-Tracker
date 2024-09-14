'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'
import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { IoIosLogOut } from 'react-icons/io'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { FaYoutube } from 'react-icons/fa6'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
  } from "@/components/ui/dropdown-menu"
  import { FaPlus } from "react-icons/fa6";
import Navbar from './Navbar'

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
        toast('Tutorial posted successfully!');
        setTitle(''); // Clear the input fields after successful submission
        setLink('');
        router.push('/'); // Navigate to the homepage or wherever you want to go after posting
      } else {
        const errorData = await response.json();
        toast(errorData.message || 'Failed to post the tutorial.');
      }
    } catch (error) {
      console.error('Error posting tutorial:', error);
      toast('Something went wrong. Please try again later.');
    }
  };

  return (
    <>
      <Navbar/>
      <ToastContainer/>
    <div className='min-h-screen w-full flex flex-col justify-center items-center'>

      {user && (
        <Card className="md:w-[700px] w-[350px] tutorialAdd">
          <CardHeader>
            <CardTitle className='text-4xl flex text-violet-400 gap-4'>Create Tutorial <FaYoutube size={40} className='text-red-500' />
            </CardTitle>
            <CardDescription>Add your tutorial in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center space-y-4'>
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              type="url"
              placeholder="Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />

            <Button type="submit">
              Submit
            </Button>
          </form>
          </CardContent>
        </Card>
        
      )}
    </div>
    </>
  );
}

export default Create;
