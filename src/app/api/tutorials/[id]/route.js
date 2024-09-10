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