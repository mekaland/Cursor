import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: 'Doğrulama kodu gerekli' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    // Kullanıcıyı doğrulama koduna göre bul
    const user = await db.collection('users').findOne({
      verificationCode: code,
      isVerified: false,
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Geçersiz doğrulama kodu' },
        { status: 400 }
      );
    }

    // Kullanıcıyı doğrulanmış olarak işaretle
    await db.collection('users').updateOne(
      { _id: new ObjectId(user._id) },
      {
        $set: {
          isVerified: true,
          verificationCode: null,
        },
      }
    );

    return NextResponse.json(
      { message: 'E-posta başarıyla doğrulandı' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Doğrulama hatası:', error);
    return NextResponse.json(
      { error: 'Doğrulama işlemi başarısız oldu' },
      { status: 500 }
    );
  }
} 