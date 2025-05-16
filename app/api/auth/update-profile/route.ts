import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { connectToDatabase } from "@/app/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Oturum açmanız gerekiyor" },
        { status: 401 }
      );
    }

    const { name, currentPassword, newPassword } = await req.json();
    const { db } = await connectToDatabase();

    const user = await db.collection("users").findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    // Şifre değişikliği varsa
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: "Mevcut şifrenizi girmelisiniz" },
          { status: 400 }
        );
      }

      const isValid = await bcrypt.compare(currentPassword, user.hashedPassword);
      if (!isValid) {
        return NextResponse.json(
          { error: "Mevcut şifreniz yanlış" },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await db.collection("users").updateOne(
        { email: session.user.email },
        {
          $set: {
            name,
            hashedPassword,
            updatedAt: new Date(),
          },
        }
      );
    } else {
      // Sadece isim güncellemesi
      await db.collection("users").updateOne(
        { email: session.user.email },
        {
          $set: {
            name,
            updatedAt: new Date(),
          },
        }
      );
    }

    return NextResponse.json({ message: "Profil başarıyla güncellendi" });
  } catch (error) {
    console.error("Profil güncelleme hatası:", error);
    return NextResponse.json(
      { error: "Profil güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 