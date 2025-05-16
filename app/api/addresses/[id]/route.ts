import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectToDatabase } from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

// PUT /api/addresses/[id] - Update an address
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    // Adresin kullanıcıya ait olduğunu kontrol et
    const address = await db.collection("addresses").findOne({
      _id: new ObjectId(params.id),
      userEmail: session.user.email,
    });

    if (!address) {
      return NextResponse.json(
        { error: "Adres bulunamadı" },
        { status: 404 }
      );
    }

    // Eğer adres varsayılan olarak işaretlendiyse, diğer adresleri varsayılan olmaktan çıkar
    if (addressData.isDefault) {
      await db.collection("addresses").updateMany(
        {
          userEmail: session.user.email,
          _id: { $ne: new ObjectId(params.id) },
        },
        { $set: { isDefault: false } }
      );
    }

    await db.collection("addresses").updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          ...addressData,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({ message: "Adres başarıyla güncellendi" });
  } catch (error) {
    console.error("Adres güncelleme hatası:", error);
    return NextResponse.json(
      { error: "Adres güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// DELETE /api/addresses/[id] - Delete an address
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Oturum açmanız gerekiyor" },
        { status: 401 }
      );
    }

    const { db } = await connectToDatabase();

    // Adresin kullanıcıya ait olduğunu kontrol et
    const address = await db.collection("addresses").findOne({
      _id: new ObjectId(params.id),
      userEmail: session.user.email,
    });

    if (!address) {
      return NextResponse.json(
        { error: "Adres bulunamadı" },
        { status: 404 }
      );
    }

    await db.collection("addresses").deleteOne({
      _id: new ObjectId(params.id),
    });

    // Eğer silinen adres varsayılan adres ise, başka bir adresi varsayılan yap
    if (address.isDefault) {
      const otherAddress = await db.collection("addresses").findOne({
        userEmail: session.user.email,
      });

      if (otherAddress) {
        await db.collection("addresses").updateOne(
          { _id: otherAddress._id },
          { $set: { isDefault: true } }
        );
      }
    }

    return NextResponse.json({ message: "Adres başarıyla silindi" });
  } catch (error) {
    console.error("Adres silme hatası:", error);
    return NextResponse.json(
      { error: "Adres silinirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 