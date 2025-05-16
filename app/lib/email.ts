import nodemailer from 'nodemailer';

console.log('Email configuration:', {
  service: 'gmail',
  user: process.env.EMAIL_USER ? '***' : 'not set',
  pass: process.env.EMAIL_PASS ? '***' : 'not set'
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function sendVerificationEmail(email: string, code: string) {
  console.log('Sending verification email to:', email);
  console.log('Verification code:', code);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'E-posta Doğrulama',
    html: `
      <h1>E-posta Doğrulama</h1>
      <p>Merhaba,</p>
      <p>Hesabınızı doğrulamak için aşağıdaki kodu kullanın:</p>
      <h2 style="color: #4F46E5; font-size: 24px; letter-spacing: 2px;">${code}</h2>
      <p>Bu kod 1 saat süreyle geçerlidir.</p>
      <p>Eğer bu işlemi siz yapmadıysanız, lütfen bu e-postayı dikkate almayın.</p>
    `
  };

  try {
    console.log('Attempting to send email...');
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
} 