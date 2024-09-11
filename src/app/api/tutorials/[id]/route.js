import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getCurrentUser } from '@/lib/session';

export async function GET(req, { params }) {
    const user = await getCurrentUser();
    const { id } = params;

    try {
        if (!user?.email) {
            return NextResponse.json({ message: 'Not Authenticated!' }, { status: 401 });
        }

        const tutorial = await prisma.tutorial.findUnique({
            where: {
                id: id,
            },
        });

        if (!tutorial) {
            return NextResponse.json({ message: 'Tutorial not found' }, { status: 404 });
        }

        return NextResponse.json(tutorial, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch tutorial' }, { status: 500 });
    }
}

export async function PATCH(req, {params}){
    const user = await getCurrentUser();
    const {id} = params;

    try {
        if(!user?.email){
            return NextResponse.json({message: "User not authenticated"}, {status: 401});
        }

        const tutorial = await prisma.tutorial.findUnique({
            where :{id: id}
        });

        if(!tutorial){
            return NextResponse.json({message: "Tutorial not found"}, {status: 404});
        }

        const updatedTutorial = await prisma.tutorial.update({
            where:{id: id},
            data:{
                done: !tutorial.done
            }
        });

        return NextResponse.json(updatedTutorial, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Internal server error, Failed to updated tutorial"}, {status:500})
    }

}

export async function POST(req, { params }) {
    const user = await getCurrentUser();
    const { id } = params;

    try {
        if (!user?.email) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }

        const { notes } = await req.json();

       
        const newNotes = notes ?? ''; 

        const newTutorial = await prisma.tutorial.update({
            where: { id: id },
            data: {
                notes: newNotes, 
            },
        });

        return NextResponse.json(newTutorial, { status: 200 });
    } catch (error) {
        console.error('Error adding notes to tutorial:', error); // Log detailed error
        return NextResponse.json({ message: "Internal server error, Failed to add notes", error: error.message }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const user = await getCurrentUser();
    const { id } = params;

    try {
        if (!user?.email) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }

        const tutorial = await prisma.tutorial.findUnique({
            where: { id: id }
        });

        if (!tutorial) {
            return NextResponse.json({ message: "Tutorial not found" }, { status: 404 });
        }

        const { notes } = await req.json();  // Updated notes from the request body

        const updatedTutorial = await prisma.tutorial.update({
            where: { id: id },
            data: { notes }
        });

        return NextResponse.json(updatedTutorial, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error, Failed to update notes" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    const user = await getCurrentUser();
    const { id } = params;

    try {
        if (!user?.email) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }

        const tutorial = await prisma.tutorial.findUnique({
            where: { id: id }
        });

        if (!tutorial) {
            return NextResponse.json({ message: "Tutorial not found" }, { status: 404 });
        }

        const updatedTutorial = await prisma.tutorial.update({
            where: { id: id },
            data: { notes: null }  // Remove notes by setting them to null or an empty string
        });

        return NextResponse.json({ message: "Notes deleted successfully", tutorial: updatedTutorial }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error, Failed to delete notes" }, { status: 500 });
    }
}
