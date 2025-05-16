import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectToDatabase } from "@/app/lib/mongodb";

// GET /api/addresses - Get all addresses for the current user
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
    const addresses = await db
      .collection("addresses")
      .find({ userEmail: session.user.email })
      .toArray();

    return NextResponse.json({ addresses });
  } catch (error) {
    console.error("Adresler getirme hatası:", error);
    return NextResponse.json(
      { error: "Adresler getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// POST /api/addresses - Create a new address
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Oturum açmanız gerekiyor" },
        { status: 401 }
      );
    }

    const { db } = await connectToDatabase();
    const addressData = await req.json();

    // Eğer yeni adres varsayılan olarak işaretlendiyse, diğer adresleri varsayılan olmaktan çıkar
    if (addressData.isDefault) {
      await db.collection("addresses").updateMany(
        { userEmail: session.user.email },
        { $set: { isDefault: false } }
      );
    }

    const result = await db.collection("addresses").insertOne({
      ...addressData,
      userEmail: session.user.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      message: "Adres başarıyla eklendi",
      addressId: result.insertedId,
    });
  } catch (error) {
    console.error("Adres ekleme hatası:", error);
    return NextResponse.json(
      { error: "Adres eklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 