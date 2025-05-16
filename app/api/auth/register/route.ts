import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { sendVerificationEmail } from '@/app/lib/email';

export async function POST(request: Request) {
  try {
    console.log('Registration request received');
    const { name, email, password } = await request.json();
    console.log('Request data:', { name, email, password: '***' });

    // Validate input
    if (!name || !email || !password) {
      console.log('Validation failed: missing fields');
      return NextResponse.json(
        { error: 'Tüm alanları doldurun' },
        { status: 400 }
      );
    }

    console.log('Connecting to MongoDB...');
    const client = await clientPromise;
    const db = client.db('kuyumcu');
    console.log('Connected to MongoDB');

    // Check if user already exists
    console.log('Checking for existing user...');
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      console.log('User already exists');
      return NextResponse.json(
        { error: 'Bu e-posta adresi zaten kullanılıyor' },
        { status: 400 }
      );
    }

    // Generate verification code
    const verificationCode = randomBytes(3).toString('hex').toUpperCase();
    console.log('Generated verification code');

    // Hash password
    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed');

    // Create user
    console.log('Creating user...');
    const result = await db.collection('users').insertOne({
      name,
      email,
      hashedPassword,
      verificationCode,
      isVerified: false,
      createdAt: new Date(),
    });
    console.log('User created:', result.insertedId);

    // Send verification email
    console.log('Sending verification email...');
    const emailSent = await sendVerificationEmail(email, verificationCode);
    if (!emailSent) {
      console.log('Email sending failed, deleting user...');
      // If email sending fails, delete the user
      await db.collection('users').deleteOne({ _id: result.insertedId });
      return NextResponse.json(
        { error: 'E-posta gönderilemedi. Lütfen tekrar deneyin.' },
        { status: 500 }
      );
    }
    console.log('Verification email sent');

    // TODO: Send verification email
    // For now, we'll just return the code in the response
    // In production, you should send this via email
    console.log('Verification code:', verificationCode);

    // Return user without password
    return NextResponse.json({
      success: true,
      message: 'Kayıt başarılı. Lütfen e-posta adresinize gönderilen doğrulama kodunu girin.',
      userId: result.insertedId,
      name,
      email
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Kayıt işlemi başarısız' },
      { status: 500 }
    );
  }
} 