import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@/lib/mongodb';
import { authOptions } from '../[...nextauth]/route';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Oturum açılmamış' },
        { status: 401 }
      );
    }

    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne(
      { email: session.user.email },
      { projection: { password: 0, verificationCode: 0 } }
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Kullanıcı bilgileri alınamadı:', error);
    return NextResponse.json(
      { error: 'Kullanıcı bilgileri alınamadı' },
      { status: 500 }
    );
  }
} 