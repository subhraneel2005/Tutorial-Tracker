import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getCurrentUser } from '@/lib/session';

export async function POST(req){

    const user = await getCurrentUser();

    try {
        if(!user?.email) {
            return NextResponse.json({ message: 'Not Authenticated!' }, { status: 401 })
          }

        const {title, link} = await req.json();
        
        const newTutorial = await prisma.tutorial.create({
            data:{
                title,
                link,
                userEmail: user.email
            }
        })
        return NextResponse.json({newTutorial}, { status: 200})
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong!'}, { status: 500 })
    }

}

export async function GET(req){
    const user = await getCurrentUser();

    try {
        if(!user?.email){
            return NextResponse.json({ message: 'Not Authenticated!' }, { status: 401 })
        }

        const tutorials = await prisma.tutorial.findMany({
            where: {userEmail: user?.email}
        })

        return NextResponse.json(tutorials, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "Server error"})
    }
}