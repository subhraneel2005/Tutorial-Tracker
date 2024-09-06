import { NextResponse } from "next/server";
import prisma from "@/lib/db";

//creating a new tutorial(POST/CREATE)

export async function POST(request){
    const {title, link, notes, userId} = await request.josn();

    try {
        const newTutorial = await prisma.tutorial.create({
            data:{
                title,
                link,
                notes,
                user: {connect: {id: userId}},
            },
        });
        return NextResponse.json(newTutorial, {status: 201})
    } catch (error) {
        return NextResponse.json({error: "Failed to create a Tutorial"}, {status: 500})
    }
}

//getting all tutorials made by the user GET
export async function GET(){
    try {
        const tutorials = await prisma.tutorial.findMany({
            include:{user:true},
        });
        return NextResponse.json(tutorials, {status: 200});
    } catch (error) {
        return NextResponse.json({error: 'Failed to fetch tutorials'}, {status: 500})
    }
}

//updating a tutorial UPDATE
export async function PATCH(request){
    const {id, title, link, notes, done} = await request.json();

    try {
        const updatedTutorial = await prisma.tutorial.update({
            where: {id},
            data: {title, link, notes, done},
        });
        return NextResponse.json(updatedTutorial, {messgae: "Tutorial updated successully"});
    } catch (error) {
        return NextResponse.json({error: "Error updating tutorial"});
    }
}

//deleting a tutorial DELETE
export async function DELETE(request){
    const {id} = await request.json();

    try {
        await prisma.tutorial.delete({
            where: {id},
        });
        return NextResponse.json({message: "Tutorial deleted successfully"});       
    } catch (error) {
        return NextResponse.json({message: "Error deleting the tutorial"});
    }
}