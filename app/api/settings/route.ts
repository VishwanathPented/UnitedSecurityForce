import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Setting from '@/models/Setting';
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
    await dbConnect();
    const settings = await Setting.find({});
    // Convert array to object for easier frontend consumption
    const settingsObj: Record<string, any> = {};
    settings.forEach(s => {
        settingsObj[s.key] = s.value;
    });
    return NextResponse.json(settingsObj);
}

export async function POST(request: Request) {
    if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await dbConnect();
    const body = await request.json(); // Expect { key: value, key2: value2 }

    const updates = [];
    for (const [key, value] of Object.entries(body)) {
        updates.push(
            Setting.findOneAndUpdate(
                { key },
                { key, value },
                { upsert: true, new: true }
            )
        );
    }

    await Promise.all(updates);
    return NextResponse.json({ success: true });
}
