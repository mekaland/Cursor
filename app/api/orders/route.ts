import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  try {
    const orderData = await request.json();
    const { client, db } = await connectToDatabase();

    // Siparişi veritabanına kaydet
    const result = await db.collection('orders').insertOne({
      ...orderData,
      status: 'pending',
      createdAt: new Date(),
    });

    // Sipariş başarıyla oluşturuldu
    return NextResponse.json({
      success: true,
      orderId: result.insertedId,
      message: 'Siparişiniz başarıyla oluşturuldu.',
    });
  } catch (error) {
    console.error('Sipariş oluşturma hatası:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Sipariş oluşturulurken bir hata oluştu.',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Oturum açmanız gerekiyor" },
        { status: 401 }
      );
    }

    const { db } = await connectToDatabase();
    const orders = await db
      .collection("orders")
      .find({ userEmail: session.user.email })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Siparişler getirme hatası:", error);
    return NextResponse.json(
      { error: "Siparişler getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 