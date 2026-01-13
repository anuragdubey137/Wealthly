import { NextRequest } from "next/server";


export async function POST(req:NextRequest) {
    return new Response('Transaction created successfully');
}
export async function GET(req:NextRequest) {
    return new Response('Transaction API is working');
}
export async function PUT(req:NextRequest) {
    return new Response('Transaction updated successfully');
}
export async function DELETE(req:NextRequest) {
    return new Response('Transaction deleted successfully');
}