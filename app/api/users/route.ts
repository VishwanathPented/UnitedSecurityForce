import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

async function checkAuth() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return false;
    try {
        const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret');
        const { payload } = await jwtVerify(token, JWT_SECRET);
        // Only admin can manage users
        return payload.role === 'admin';
    } catch {
        return false;
    }
}

export async function GET() {
    if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await dbConnect();
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    return NextResponse.json(users);
}

export async function POST(request: Request) {
    if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await dbConnect();
    const { username, password, role } = await request.json();

    if (!username || !password) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({ username, password: hashedPassword, role: role || 'editor' });
        return NextResponse.json({ _id: user._id, username: user.username, role: user.role });
    } catch (err: any) {
        if (err.code === 11000) return NextResponse.json({ error: 'Username exists' }, { status: 400 });
        return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Prevent deleting self (simple check, better done by checking token userId)
    // For now assuming Admin won't delete themselves by valid ID

    await User.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
}
