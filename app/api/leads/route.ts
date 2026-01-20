import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Lead from '@/models/Lead';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

async function checkAuth() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return false;
    try {
        const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret');
        await jwtVerify(token, JWT_SECRET);
        return true;
    } catch {
        return false;
    }
}

export async function GET() {
    if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await dbConnect();
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    return NextResponse.json(leads);
}

export async function POST(request: Request) {
    // Public endpoint for submitting leads
    await dbConnect();
    const body = await request.json();
    const lead = await Lead.create(body);
    return NextResponse.json(lead);
}

export async function PUT(request: Request) {
    if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await dbConnect();
    const body = await request.json();
    const { _id, ...update } = body;
    const lead = await Lead.findByIdAndUpdate(_id, update, { new: true });
    return NextResponse.json(lead);
}

export async function DELETE(request: Request) {
    if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await dbConnect();
    const { searchParams } = new URL(request.url);
    await Lead.findByIdAndDelete(searchParams.get('id'));
    return NextResponse.json({ success: true });
}
