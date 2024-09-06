import { NextResponse } from "next/server";
import prisma from "@/lib/db";

//create a new user POST
export async function POST(request){
    const {email, name, photo} = await request.json();

    try {
        const newUser = await prisma.user.create({
            data:{
                email,
                name,
                photo
            },
        });
        return NextResponse.json(newUser, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "Error creating user"})
    }
}

//getting all users GET
export async function GET(request){
    try {
        const allUsers = await prisma.user.findMany();
        return NextResponse.json(allUsers, {status:200});        
   } catch (error) {
        return NextResponse.json({error: "No Users found, Failed to fetch the users"});
    }
}