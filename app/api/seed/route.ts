import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        await dbConnect();

        const existingAdmin = await User.findOne({ username: 'admin' });
        if (existingAdmin) {
            return NextResponse.json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash('admin123', 10);
        const user = await User.create({
            username: 'admin',
            password: hashedPassword,
            role: 'admin',
        });

        return NextResponse.json({ message: 'Admin created successfully', user });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error seeding database' }, { status: 500 });
    }
}
