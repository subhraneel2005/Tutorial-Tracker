'use client'
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  return (
    <div className='w-full justify-between items-center px-12'>
     {user?.image &&  <img className='avatar rounded-full' src={user?.image}/>}
    <div className='navbar hidden md:flex justify-evenly items-center top-10 left-[37%]'>
        <div className='text-[#F5F3F4] cursor-pointer' onClick={() => router.push('/tutorials')}>Add</div>
        <div className='text-[#F5F3F4] cursor-pointer' onClick={() => router.push('/view')}>View</div>
        {user?<div className='text-[#eb3434] cursor-pointer' onClick={() => signOut()}>Sign Out</div>:<div className='text-[#0084FF] cursor-pointer'  onClick={() => signIn()}>Sign In</div>}
    </div>
    </div>
  )
}

export default Navbar