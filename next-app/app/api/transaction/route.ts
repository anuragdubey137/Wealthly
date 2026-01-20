
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req:NextRequest) {
    const session = await getServerSession();
    if(!session || !session.user){

        return new Response('Unauthorized', { status: 401 });
    }
    const body = await req.json();
    // validate input here

    if (!session.user.email) {
        return new Response('Unauthorized', { status: 401 });
    }
    
    const transaction = await prisma.transaction.create({
        data: {
            amount: body.amount,
            type: body.type,
            category: body.category,
            description: body.description ?? "",
            user: {
                connect: { email: session.user.email }
            },
            date: new Date(body.date)
        }
    });
    return new Response(JSON.stringify(transaction), { status: 201 });



}
export async function GET(req:NextRequest) {
    const session = await getServerSession();
    if(!session || !session.user){

        return new Response('Unauthorized', { status: 401 });
    }
    if (!session.user.email) {
        return new Response('Unauthorized', { status: 401 });
    }
    const transactions = await prisma.transaction.findMany({
        where: {
            user: {
                email: session.user.email
            }
        },
        orderBy: {
            date: 'desc'
        }
    });
    return new Response(JSON.stringify(transactions), { status: 200 });
}
export async function PUT(req:NextRequest) {
    return new Response('Transaction updated successfully');
}
export async function DELETE(req:NextRequest) {
    return new Response('Transaction deleted successfully');
}