import React from 'react'

function Homepage() {
  return (
    <div className='min-h-screen w-full flex justify-center md:px-12 items-center'>
        <div className='mobileBox md:hidden flex'></div>
        <div className='flex flex-col w-full h-full px-12 space-y-6 md:space-y-10 md:mt-0 mt-[290px]'>
            <h1 className='text-[2rem] md:text-[3.2rem]'>Youtube Tutorial Tracker</h1>
            <div>
                <p className='text-[0.8rem] md:text-[1.3rem] text-[#F5F3F4]'>Track long youtube tutorials.</p>
                <p className='text-[0.8rem] md:text-[1.3rem] text-[#F5F3F4]'>Be more productive. Earn </p>
                <p className='text-[0.8rem] md:text-[1.3rem] text-[#F5F3F4]'>exciting rewards.</p>
            </div>
            <button className='md:btn mobileBtn'>Get Started</button>
        </div>
        <div className='box md:left-[1100px] absolute hidden md:flex'></div>
    </div>
  )
}

export default Homepage